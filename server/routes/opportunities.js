const express = require('express');
const router = express.Router();
const {
    getOpportunities,
    createOpportunity,
    getOpportunity,
    applyToOpportunity
} = require('../controllers/opportunityController');
const { protect } = require('../middleware/auth');

router.route('/')
    .get(getOpportunities)
    .post(protect, createOpportunity);

router.get('/:id', getOpportunity);
router.post('/:id/apply', protect, applyToOpportunity);

module.exports = router;
