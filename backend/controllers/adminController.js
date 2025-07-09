const db = require('../config/db');

// Get all users
exports.getAllUsers = (req, res) => {
  db.query('SELECT id, name, email, role FROM users', (err, results) => {
    if (err) {
      console.error('Get Users Error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Delete user
exports.deleteUser = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Delete User Error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'User deleted' });
  });
};

// Update user role
exports.updateUserRole = (req, res) => {
  const id = req.params.id;
  const { role } = req.body;
  db.query('UPDATE users SET role = ? WHERE id = ?', [role, id], (err) => {
    if (err) {
      console.error('Update Role Error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: `Role updated to ${role}` });
  });
};

// Get all stores
exports.getAllStores = (req, res) => {
  const sql = `
    SELECT stores.*, users.name AS owner_name
    FROM stores
    LEFT JOIN users ON stores.user_id = users.id
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Get Stores Error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Delete store
exports.deleteStore = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM stores WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Delete Store Error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Store deleted' });
  });
};



// Get all ratings (admin only)
exports.getAllRatings = (req, res) => {
  const sql = `
    SELECT ratings.id, ratings.rating, 
           users.name AS user_name, 
           stores.name AS store_name
    FROM ratings
    LEFT JOIN users ON ratings.user_id = users.id
    LEFT JOIN stores ON ratings.store_id = stores.id
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Get Ratings Error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};


// Delete a rating
exports.deleteRating = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM ratings WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Delete Rating Error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Rating deleted' });
  });
};
