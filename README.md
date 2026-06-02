# FitPredict AI

FitPredict AI is a resume-ready full-stack machine learning project that predicts expected fat loss, weight loss, BMI, confidence score, weekly progress, and monthly progress from lifestyle inputs.

## Architecture

React Frontend -> Node.js Express Backend -> MySQL Database -> Python Flask ML Service -> Best Regression Model

## Folder Structure

```text
frontend/      React, Tailwind, Router, Axios, Recharts
backend/       Express MVC API, Sequelize models, auth, validation
ml-service/    Dataset generation, preprocessing, training, Flask prediction API
schema.sql     MySQL database and table schema
```

## Database Setup

1. Start MySQL 8.
2. Import `schema.sql`.
3. Copy `backend/.env.example` to `backend/.env` and update MySQL credentials.

## ML Setup

```bash
cd ml-service
pip install -r requirements.txt
python train_model.py
python app.py
```

`train_model.py` generates `dataset/fat_loss_dataset.csv` with 5000 synthetic records, removes duplicates, treats outliers, preprocesses data, compares Linear Regression, Decision Tree, and Random Forest, saves the best model, and creates report charts in `reports/`.

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

Default backend URL: `http://localhost:5000`.

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Default frontend URL: `http://localhost:5173`.

## API Documentation

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`

### Prediction

- `POST /api/predict`

```json
{
  "userId": 1,
  "age": 25,
  "gender": "Male",
  "height": 175,
  "weight": 80,
  "calories": 2200,
  "workout_duration": 60,
  "steps": 10000,
  "sleep_hours": 8,
  "water_intake": 3,
  "activity_level": "High"
}
```

### History

- `GET /api/history?userId=1`
- `DELETE /api/history/:id?userId=1`

### Dashboard

- `GET /api/dashboard/stats?userId=1`

## Screenshots

Add screenshots of the Home, Dashboard, Analytics, and History pages after running the app locally.

## Future Enhancements

- JWT sessions
- Personalized meal and workout recommendations
- Wearable device imports
- SHAP-based model explainability
- Cloud deployment

