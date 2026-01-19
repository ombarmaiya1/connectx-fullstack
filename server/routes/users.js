const express = require('express');
const router = express.Router();
const {
    getUserProfile,
    updateProfile,
    searchUsers,
    getSuggestedUsers
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/search', searchUsers);
router.get('/suggested', protect, getSuggestedUsers);
router.get('/:id', getUserProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;
