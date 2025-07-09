const db = require('../config/db');

// ✅ Create a new store for the authenticated Store Owner
exports.addStore = (req, res) => {
  const { name, email, address } = req.body;
  const user_id = req.user.id; // ✅ logged-in user's ID

  db.query(
    'SELECT * FROM users WHERE id = ? AND role = ?',
    [user_id, 'Store Owner'],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length === 0) {
        return res.status(403).json({ message: 'User is not a Store Owner' });
      }

      db.query(
        'INSERT INTO stores (name, email, address, user_id) VALUES (?, ?, ?, ?)',
        [name, email, address, user_id],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json({ message: 'Store added successfully' });
        }
      );
    }
  );
};

// ✅ Get all stores (admin or for filtering on frontend)
exports.getAllStores = (req, res) => {
  db.query('SELECT * FROM stores', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
exports.getAverageRating = (req, res) => {
  const storeId = req.params.id;
  const userId = req.user.id;

  db.query(
    'SELECT * FROM stores WHERE id = ? AND user_id = ?',
    [storeId, userId],
    (err, storeResults) => {
      if (err) return res.status(500).json({ error: err.message });
      if (storeResults.length === 0)
        return res.status(403).json({ message: 'You do not own this store' });

      db.query(
        'SELECT AVG(rating) AS averageRating FROM ratings WHERE store_id = ?',
        [storeId],
        (err, results) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ averageRating: results[0].averageRating || 0 });
        }
      );
    }
  );
};
