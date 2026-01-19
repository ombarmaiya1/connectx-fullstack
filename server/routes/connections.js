const express = require('express');
const router = express.Router();
const {
    getConnections,
    sendConnectionRequest,
    acceptConnectionRequest,
    removeConnection,
    getPendingRequests
} = require('../controllers/connectionController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getConnections);
router.get('/requests', protect, getPendingRequests);
router.post('/request', protect, sendConnectionRequest);
router.put('/accept/:id', protect, acceptConnectionRequest);
router.delete('/:userId', protect, removeConnection);

module.exports = router;
