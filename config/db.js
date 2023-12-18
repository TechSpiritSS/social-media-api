const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Connecting to Database...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Database Connected!');

    // Graceful shutdown on SIGINT (e.g., Ctrl+C)
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log(
          'Database connection closed due to application termination'
        );
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
