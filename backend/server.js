const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database'); // Import database connection

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Fetch all ideas
app.get('/ideas', (req, res) => {
  db.all('SELECT * FROM ideas ORDER BY timestamp DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Add a new idea
app.post('/ideas', (req, res) => {
  const { content } = req.body;
  db.run('INSERT INTO ideas (content) VALUES (?)', [content], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID, content, timestamp: new Date() });
    }
  });
});

// Delete an idea
app.delete('/ideas/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM ideas WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ success: true, deletedId: id });
    }
  });
});

// Update an idea
app.put('/ideas/:id', (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  db.run('UPDATE ideas SET content = ? WHERE id = ?', [content, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ success: true, updatedId: id });
    }
  });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
