const axios = require('axios');

async function getPrediction(payload) {
  
  const baseUrl = process.env.ML_SERVICE_URL || 'http://localhost:8000';
  const { data } = await axios.post(`${baseUrl}/predict`, payload, { timeout: 10000 });
  
  return data;
}


module.exports = { getPrediction };

