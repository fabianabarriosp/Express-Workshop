const express = require('express');
const app = express();
const blogRoutes = require('./routes/blogRoutes'); // Ensure this path is correct
const db = require('./database'); // Ensure this path is correct to your database setup

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // Body parser for form data
app.use(express.static('public')); //css or other static works

// Password protection
const password = '123';

// Middleware to check if user is authorized
function simpleAuth(req, res, next) {
  if (req.session.isAuthorized) {
    next();  // Proceed if authorized
  } else {
    res.redirect('/login');  // Redirect if not authorized
  }
}

// Login route (GET) - displays the login form
app.get('/login', (req, res) => {
  res.render('login');  // Render the login.ejs form
});

// Login POST - check the password
app.post('/login', (req, res) => {
  const { password: userPassword } = req.body;

  if (userPassword === password) {
    req.session.isAuthorized = true;
    res.redirect('/blogs');
  } else {
    res.send('Incorrect password. Please try again.');
  }
});

// /blogs route (auth required)
app.use('/blogs', simpleAuth, (req, res) => {
  res.send('Welcome to the blogs page!');
});

// Root route - redirect to /blogs
app.get('/', (req, res) => res.redirect('/blogs'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));