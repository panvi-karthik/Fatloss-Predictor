from pathlib import Path
import joblib
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.tree import DecisionTreeRegressor

BASE = Path(__file__).resolve().parent
DATASET = BASE / "dataset" / "fat_loss_dataset.csv"
REPORTS = BASE / "reports"
FEATURES = ["Age", "Gender", "Height", "Weight", "BMI", "Calories", "WorkoutDuration", "Steps", "SleepHours", "WaterIntake", "ActivityLevel"]
TARGETS = ["FatLoss", "WeightLoss"]




def generate_dataset(rows=5000, seed=42):
    rng = np.random.default_rng(seed)
    age = rng.integers(18, 66, rows)
    gender = rng.choice(["Male", "Female", "Other"], rows, p=[0.48, 0.48, 0.04])
    height = np.where(gender == "Female", rng.normal(162, 7, rows), rng.normal(174, 8, rows)).clip(140, 205)
    weight = rng.normal(78, 18, rows).clip(45, 160)
    bmi = weight / ((height / 100) ** 2)
    calories = rng.normal(2300, 500, rows).clip(1100, 4200)
    workout = rng.normal(45, 28, rows).clip(0, 150)
    steps = rng.normal(8000, 3500, rows).clip(1000, 25000)
    sleep = rng.normal(7.0, 1.2, rows).clip(4, 10)
    water = rng.normal(2.6, 0.9, rows).clip(0.8, 6)
    activity = rng.choice(["Low", "Moderate", "High"], rows, p=[0.34, 0.43, 0.23])
    activity_bonus = pd.Series(activity).map({"Low": -0.25, "Moderate": 0.25, "High": 0.65}).to_numpy()
    calorie_penalty = (calories - 2100) / 900
    bmi_effect = np.clip((bmi - 22) / 7, -0.2, 1.4)
    consistency_bonus = np.where((workout > 45) & (steps > 8500), 0.9, 0)
    recovery_bonus = np.where((sleep >= 7) & (sleep <= 8.8), 0.55, -0.15)
    deficit_bonus = np.where((calories < 2200) & (workout > 35), 0.7, 0)
    overtraining_penalty = np.where((workout > 115) & (sleep < 6), 0.65, 0)
    fat_loss = (
        1.25 + np.sqrt(workout) / 4.5 + np.log1p(steps) / 5.2 + water * 0.1
        + activity_bonus + bmi_effect * 0.5 - calorie_penalty + consistency_bonus
        + recovery_bonus + deficit_bonus - overtraining_penalty + rng.normal(0, 0.32, rows)
    ).clip(0.2, 8.5)
    weight_loss = (fat_loss + rng.normal(0.6, 0.35, rows)).clip(fat_loss, 10)
    df = pd.DataFrame({
        "Age": age, "Gender": gender, "Height": height.round(1), "Weight": weight.round(1),
        "BMI": bmi.round(2), "Calories": calories.astype(int), "WorkoutDuration": workout.astype(int),
        "Steps": steps.astype(int), "SleepHours": sleep.round(1), "WaterIntake": water.round(1),
        "ActivityLevel": activity, "FatLoss": fat_loss.round(2), "WeightLoss": weight_loss.round(2)
    })
    DATASET.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(DATASET, index=False)
    return df



def clean_data(df):
    df = df.drop_duplicates()
    for col in ["Height", "Weight", "BMI", "Calories", "WorkoutDuration", "Steps", "SleepHours", "WaterIntake", "FatLoss", "WeightLoss"]:
        q1, q3 = df[col].quantile([0.25, 0.75])
        iqr = q3 - q1
        df[col] = df[col].clip(q1 - 1.5 * iqr, q3 + 1.5 * iqr)
    return df


def save_reports(df, results, best_name, best_model):
    REPORTS.mkdir(exist_ok=True)
    numeric = df.select_dtypes(include=np.number)
    plt.figure(figsize=(10, 7))
    sns.heatmap(numeric.corr(), cmap="viridis", annot=False)
    plt.tight_layout()
    plt.savefig(REPORTS / "correlation_heatmap.png")
    plt.close()
    for col in ["FatLoss", "WeightLoss", "Calories", "WorkoutDuration"]:
        plt.figure(figsize=(7, 4))
        sns.histplot(df[col], kde=True)
        plt.tight_layout()
        plt.savefig(REPORTS / f"{col.lower()}_distribution.png")
        plt.close()
    with open(BASE / "model_comparison_report.txt", "w", encoding="utf-8") as f:
        for name, metrics in results.items():
            f.write(f"{name}: MAE={metrics['MAE']:.3f}, MSE={metrics['MSE']:.3f}, RMSE={metrics['RMSE']:.3f}, R2={metrics['R2']:.3f}\n")
        f.write(f"\nBest model: {best_name}\n")
    if hasattr(best_model, "feature_importances_"):
        importances = pd.Series(best_model.feature_importances_)
        importances.sort_values(ascending=False).head(15).to_csv(BASE / "feature_importance_report.txt", header=["importance"])
        plt.figure(figsize=(8, 5))
        importances.sort_values(ascending=False).head(15).plot(kind="bar")
        plt.tight_layout()
        plt.savefig(REPORTS / "feature_importance_graph.png")
        plt.close()


def main():
    df = generate_dataset()
    df = clean_data(df)
    X, y = df[FEATURES], df[TARGETS]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    numeric = ["Age", "Height", "Weight", "BMI", "Calories", "WorkoutDuration", "Steps", "SleepHours", "WaterIntake"]
    categorical = ["Gender", "ActivityLevel"]
    preprocessor = ColumnTransformer([
        ("num", Pipeline([("imputer", SimpleImputer(strategy="median")), ("scaler", StandardScaler())]), numeric),
        ("cat", Pipeline([("imputer", SimpleImputer(strategy="most_frequent")), ("encoder", OneHotEncoder(handle_unknown="ignore"))]), categorical)
    ])
    X_train_p = preprocessor.fit_transform(X_train)
    X_test_p = preprocessor.transform(X_test)
    models = {
        "Linear Regression": LinearRegression(),
        "Decision Tree Regressor": DecisionTreeRegressor(random_state=42, max_depth=9),
        "Random Forest Regressor": RandomForestRegressor(random_state=42, n_estimators=160, max_depth=14)
    }
    results = {}
    trained = {}
    for name, model in models.items():
        model.fit(X_train_p, y_train)
        preds = model.predict(X_test_p)
        mse = mean_squared_error(y_test, preds)
        results[name] = {"MAE": mean_absolute_error(y_test, preds), "MSE": mse, "RMSE": np.sqrt(mse), "R2": r2_score(y_test, preds)}
        trained[name] = model
    best_name = max(results, key=lambda name: results[name]["R2"])
    joblib.dump(trained[best_name], BASE / "model.pkl")
    joblib.dump(preprocessor, BASE / "preprocessor.pkl")
    save_reports(df, results, best_name, trained[best_name])
    print(f"Saved dataset, reports and best model: {best_name}")


if __name__ == "__main__":
    main()
