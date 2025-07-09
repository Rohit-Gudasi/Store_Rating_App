const db = require('../config/db');

exports.submitRating = (req, res) => {
  const { store_id, rating } = req.body;
  const user_id = req.user.id;

  db.query('INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating = ?',
    [user_id, store_id, rating, rating],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: 'Rating submitted' });
    }
  );
};
