const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const user = process.env.USER_NAME;
const password = process.env.USER_PWD;
const dbUrl = "mongodb://" + process.env.DB_URL;

app.get('/', (req, res) => {
  res.send('Hello from WebApp');
});

// MongoDB connection test
app.get('/test-db', async (req, res) => {
  try {
    console.log(`Connecting to ${dbUrl}`)
    const client = new MongoClient(dbUrl, {
      auth: { username: user, password: password },
    });
    await client.connect();
    res.send('Successfully connected to MongoDB!');
    client.close();
  } catch (err) {
    res.status(500).send(`Failed to connect to MongoDB: ${err.message}`);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
