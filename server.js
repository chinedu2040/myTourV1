const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');


// Connect to the database
const DB = process.env.DATABASE.replace('<PASSWORD>',
 process.env.DATABASE_PASSWORD
 );
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => {
    console.error('DB connection failed:', err.message);
    process.exit(1);
  });


const port =  process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

