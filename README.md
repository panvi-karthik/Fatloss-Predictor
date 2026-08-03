1. 🤖 FitPredict AI :-

FitPredict AI is a full-stack machine learning web application that predicts expected fat loss and weight loss based on a user's health and lifestyle data. The application combines machine learning, data analytics, and modern web technologies to help users understand how factors such as calorie intake, exercise, sleep, and daily activity influence fat loss.

The project was developed as a final-year engineering project to gain practical experience in full-stack development, machine learning, REST APIs, and database management.




2. ✨ Features :-

* User Registration and Login
* Machine Learning Based Fat Loss Prediction
* Automatic BMI Calculation
* Weight Loss Prediction
* Prediction Confidence Score
* Interactive Dashboard
* Health Analytics Charts
* Prediction History
* Search and Filter History
* Export History as CSV
* Responsive User Interface




3. 📝 Tech Stack :-

(i) Frontend:
* React.js (Vite)
* Tailwind CSS
* React Router DOM
* Axios
* Recharts
* React Toastify

(ii) Backend:
* Node.js
* Express.js
* Sequelize ORM
* Express Validator
* bcryptjs

(iii)Database:
* MySQL

(iv)Machine Learning:
* Python
* Flask
* Pandas
* NumPy
* Scikit-learn
* Joblib




4. ⚙️ Project Architecture :-

React Frontend

↓

Node.js + Express Backend

↓

MySQL Database

↓

Python Flask ML Service

↓

Machine Learning Model




5. ❓ How the Application Works :-

i. The user logs into the application.
ii. The user enters health details including:

   * Age
   * Gender
   * Height
   * Weight
   * Daily Calorie Intake
   * Workout Duration
   * Daily Steps
   * Sleep Hours
   * Water Intake
   * Activity Level
iii. The backend validates the input.
iv. BMI is calculated using height and weight.
v. The backend sends the processed data to the Python machine learning service.
vi. The trained model predicts:

   * Expected Fat Loss
   * Expected Weight Loss
   * Confidence Score
vii. The prediction is stored in MySQL.
viii. Users can view previous predictions and analyze their progress using interactive charts.




6. 🤖 Machine Learning Workflow

i. Dataset Generation:
A synthetic dataset containing realistic health records is generated using Python.

ii. Dataset Features:
* Age
* Gender
* Height
* Weight
* BMI
* Calories
* Workout Duration
* Steps
* Sleep Hours
* Water Intake
* Activity Level
* Fat Loss
* Weight Loss

iii.Data Preprocessing:
* Missing Value Handling
* Duplicate Removal
* Outlier Detection
* Feature Engineering
* Label Encoding
* Feature Scaling
* Correlation Analysis

iv. Models Used:
* Linear Regression
* Decision Tree Regressor
* Random Forest Regressor

v. Evaluation Metrics:
* R² Score
* Mean Absolute Error (MAE)
* Mean Squared Error (MSE)
* Root Mean Squared Error (RMSE)

The best-performing model is selected automatically and saved using Joblib.




7. ✨ Project Structure


fitpredict-ai/

frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│

backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│

ml-service/
│
├── dataset/
├── reports/
├── train_model.py
├── predict.py
├── app.py
├── model.pkl
└── preprocessor.pkl

schema.sql
README.md





8. 📂 Database :-

i.users:
* id
* username
* password
* created_at

ii. prediction_history:
* id
* user_id
* age
* gender
* height
* weight
* bmi
* calories
* workout_duration
* steps
* sleep_hours
* water_intake
* activity_level
* predicted_fat_loss
* predicted_weight_loss
* confidence_score
* created_at




9.🔗 API Endpoints :-

Authentication

POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

Prediction

POST /api/predict

History

GET /api/history

DELETE /api/history/:id

Dashboard

GET /api/dashboard/stats




10. ⬇️ Installation :-

Clone the repository

git clone https://github.com/your-username/FitPredict-AI.git
cd FitPredict-AI


Install Backend


cd backend
npm install
npm run dev


Install Frontend

cd frontend
npm install
npm run dev


Run Machine Learning Service

cd ml-service
pip install -r requirements.txt
python app.py


Database Setup

1. Install MySQL.
2. Create a database named fitpredict_db.
3. Import schema.sql.
4. Update the database credentials in the backend configuration.




11. 🔨 Future Improvements

* Personalized fitness recommendations
* Real fitness tracker integration
* Nutrition planner
* Mobile application
* Real-world dataset integration
* Advanced machine learning models
* Weekly progress reports
* User profile management




12. 📚 Learning Outcomes

Through this project, I gained practical experience in:

* Full-stack web development
* REST API development
* Database design using MySQL
* Machine learning model development
* Data preprocessing and feature engineering
* Backend and ML service integration
* Data visualization
* Version control using Git and GitHub


---------------------

👤 Authors:
Panvi Karthik Pachalla
N. Varshith

🔗GitHub:
https://github.com/panvi-karthik

🔗LinkedIn:
https://www.linkedin.com/in/panvi-karthik-pachalla-4a7a51276/

