CREATE DATABASE IF NOT EXISTS fitpredict_db;
USE fitpredict_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(80) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS prediction_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  age INT NOT NULL,
  gender VARCHAR(20) NOT NULL,
  height FLOAT NOT NULL,
  weight FLOAT NOT NULL,
  bmi FLOAT NOT NULL,
  calories INT NOT NULL,
  workout_duration INT NOT NULL,
  steps INT NOT NULL,
  sleep_hours FLOAT NOT NULL,
  water_intake FLOAT NOT NULL,
  activity_level VARCHAR(20) NOT NULL,
  predicted_fat_loss FLOAT NOT NULL,
  predicted_weight_loss FLOAT NOT NULL,
  confidence_score FLOAT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_prediction_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

