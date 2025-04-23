const express = require('express');
const router = express.Router();
const db = require('../database');

// Route to display all blog posts, sorted by category and created_at
router.get('/', (req, res) => {
    db.all('SELECT * FROM posts ORDER BY category, created_at DESC', [], (err, rows) => {
      if (err) {
        throw err;
      }
      res.render('index', { posts: rows });
    });
  });

// Route to display the form for a new blog post
router.get('/new', (req, res) => {
  res.render('new');
});

// Route to add a new blog post (Step 3)
router.post('/', (req, res) => {
  const { title, content, category } = req.body; // Get title, content, and category from the form
  db.run(
    'INSERT INTO posts (title, content, category) VALUES (?, ?, ?)',
    [title, content, category], // Insert the new post with category into the database
    (err) => {
      if (err) {
        throw err;
      }
      res.redirect('/blogs'); // Redirect to the blog index after adding the post
    }
  );
});

// Route to filter posts by category
router.get('/filter', (req, res) => {
    const { category } = req.query;
    const query = category ? 'SELECT * FROM posts WHERE category = ? ORDER BY created_at DESC' : 'SELECT * FROM posts ORDER BY created_at DESC';
    const params = category ? [category] : [];
  
    db.all(query, params, (err, rows) => {
      if (err) {
        throw err;
      }
      res.render('index', { posts: rows });
    });
  });
  
module.exports = router;
