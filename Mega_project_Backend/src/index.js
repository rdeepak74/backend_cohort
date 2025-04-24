import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
dotenv.config({
  path: './.env',
});

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1);
  });
