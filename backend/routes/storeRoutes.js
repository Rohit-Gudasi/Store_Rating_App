const express = require('express');
const {
  addStore,
  getAllStores,
  getAverageRating
} = require('../controllers/storeController');

const { authenticate, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, authorizeRoles('Store Owner'), addStore);
router.get('/', authenticate, getAllStores);
// GET /stores/:id/average-rating
router.get('/:id/average-rating', authenticate, authorizeRoles('Store Owner'), getAverageRating);

module.exports = router;
