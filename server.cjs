const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'cargoly',
});

function handleDisconnect() {
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log('Connected to MySQL database');
    }
  });

  db.on('error', (err) => {
    console.error('MySQL error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

app.post('/api/login', (req, res) => {
  const { username, password, userType } = req.body;

  const query = `SELECT * FROM Login WHERE username = ? AND password = ? AND role = ?`;

  db.query(query, [username, password, userType], (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.length === 0) {
      res.status(401).json({ error: 'Invalid username or password.' });
    } else {
      req.userType = userType;
      res.json({ message: 'Login successful!' });
    }
  });
});

app.get('/api/signup', (req, res) => {
  const query = 'SELECT userid, username, password FROM signup';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from signup table:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ signupData: results });
    }
  });
});

app.use((err, req, res, next) => {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });