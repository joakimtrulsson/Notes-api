const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('Något gick fel i koden. Stänger ner.');

  process.exit(1);
});

const app = require('./app');

const { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_SERVER, DATABASE_CONNECTION } = process.env;

const DB_URL = `${DATABASE_CONNECTION}${DATABASE_USERNAME}:${DATABASE_PASSWORD}${DATABASE_SERVER}`;
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Databas anslutningen lyckades.');
  })
  .catch((err) => {
    console.error('Anslutning till databasen misslyckades', err);
    process.exit();
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('Något gick snett med att hämta data. Stänger servern.');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
