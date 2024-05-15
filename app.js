const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const User = require('./models/User');
const connectToDatabase = require('./models/Database.js');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();

connectToDatabase();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '8p2WvEtkrv4hnjTSyIaF2WbUUOW4CLGn',
  resave: false,
  saveUninitialized: true,
}));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
  
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      const newUser = new User({ username, password });
      await newUser.save();
      res.redirect('/');
    } catch (error) {
      res.status(500).send('Error registering new user');
    }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
      req.session.username = username;
      req.session.isAuthenticated = true;
      res.redirect('/');
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error logging in user' });
  }
});

app.get('/loginStatus', (req, res) => {
  if (req.session.isAuthenticated) {
    res.json({ 
      loggedIn: true,
      username: req.session.username
    });
  } else {
    res.json({ 
      loggedIn: false
    });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Logout failed');
    } else {
      res.clearCookie('connect.sid');
      res.redirect('/');
    }
  });
});

app.listen(3000, "0.0.0.0", () => console.log('Server running on http://localhost:3000'));
