import joblib
import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model.pkl"
PREPROCESSOR_PATH = BASE_DIR / "preprocessor.pkl"

model = None
preprocessor = None

def load_artifacts():
    global model, preprocessor
    if model is None:
        model = joblib.load(MODEL_PATH)
    if preprocessor is None:
        preprocessor = joblib.load(PREPROCESSOR_PATH)
    return model, preprocessor

def calculate_bmi(height_cm, weight_kg):
    return round(weight_kg / ((height_cm / 100) ** 2), 2)

def predict_fat_loss(payload):
    mdl, prep = load_artifacts()
    bmi = calculate_bmi(float(payload["height"]), float(payload["weight"]))
    row = {
        "Age": int(payload["age"]),
        "Gender": payload["gender"],
        "Height": float(payload["height"]),
        "Weight": float(payload["weight"]),
        "BMI": bmi,
        "Calories": int(payload["calories"]),
        "WorkoutDuration": int(payload["workout_duration"]),
        "Steps": int(payload["steps"]),
        "SleepHours": float(payload["sleep_hours"]),
        "WaterIntake": float(payload["water_intake"]),
        "ActivityLevel": payload["activity_level"]
    }
    features = prep.transform(pd.DataFrame([row]))
    fat_loss, weight_loss = mdl.predict(features)[0]
    fat_loss = max(0, round(float(fat_loss), 2))
    weight_loss = max(fat_loss, round(float(weight_loss), 2))
    confidence = min(98, max(65, 86 + row["WorkoutDuration"] * 0.04 + row["SleepHours"] * 0.8 - abs(row["Calories"] - 2200) * 0.005))
    return {
        "bmi": bmi,
        "predicted_fat_loss": fat_loss,
        "predicted_weight_loss": weight_loss,
        "confidence_score": round(confidence, 1),
        "weekly_progress_estimate": round(weight_loss / 4, 2),
        "monthly_progress_estimate": weight_loss
    }

