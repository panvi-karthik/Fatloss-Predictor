const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
  } 
  
  catch (error) {
    console.error('Unable to start backend:', error.message);
    process.exit(1);
  }
}



start();

