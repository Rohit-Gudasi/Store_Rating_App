const express = require('express'); // ← This is missing

const {
  getAllUsers,
  deleteUser,
  updateUserRole,
  getAllStores,
  deleteStore,
  getAllRatings,
  deleteRating
} = require('../controllers/adminController');

const { authenticate, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate, authorizeRoles('System Administrator'));

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/role', updateUserRole);

router.get('/stores', getAllStores);
router.delete('/stores/:id', deleteStore);


router.get('/ratings', getAllRatings);      
router.delete('/ratings/:id', deleteRating);

module.exports = router;
