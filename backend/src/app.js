const express = require('express');
const cors = require('cors');

require('dotenv').config();
require('./models/Prediction');




const authRoutes = require('./routes/authRoutes');
const predictionRoutes = require('./routes/predictionRoutes');
const historyRoutes = require('./routes/historyRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const app = express();



app.use(cors());
app.use(express.json());
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/predict', predictionRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  const mlDown = err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT';
  res.status(mlDown ? 503 : 500).json({
    message: mlDown ? 'ML service is unavailable' : 'Something went wrong'
  });
});



module.exports = app;

