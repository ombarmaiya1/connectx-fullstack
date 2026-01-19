const Opportunity = require('../models/Opportunity');

// @desc    Get all opportunities
// @route   GET /api/opportunities
// @access  Public
const getOpportunities = async (req, res) => {
    try {
        const opportunities = await Opportunity.find()
            .populate('createdBy', 'name avatar')
            .sort({ createdAt: -1 });

        res.json(opportunities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create opportunity
// @route   POST /api/opportunities
// @access  Private
const createOpportunity = async (req, res) => {
    try {
        const { title, description, type, company, location, tags, deadline } = req.body;

        const opportunity = await Opportunity.create({
            title,
            description,
            type,
            company,
            location: location || 'Remote',
            tags: tags || [],
            deadline,
            createdBy: req.user._id
        });

        const populatedOpp = await Opportunity.findById(opportunity._id)
            .populate('createdBy', 'name avatar');

        res.status(201).json(populatedOpp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single opportunity
// @route   GET /api/opportunities/:id
// @access  Public
const getOpportunity = async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id)
            .populate('createdBy', 'name avatar')
            .populate('applicants', 'name avatar headline');

        if (!opportunity) {
            return res.status(404).json({ message: 'Opportunity not found' });
        }

        res.json(opportunity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Apply to opportunity
// @route   POST /api/opportunities/:id/apply
// @access  Private
const applyToOpportunity = async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id);

        if (!opportunity) {
            return res.status(404).json({ message: 'Opportunity not found' });
        }

        // Check if already applied
        if (opportunity.applicants.includes(req.user._id)) {
            return res.status(400).json({ message: 'Already applied to this opportunity' });
        }

        opportunity.applicants.push(req.user._id);
        await opportunity.save();

        res.json({ message: 'Applied successfully', opportunity });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getOpportunities,
    createOpportunity,
    getOpportunity,
    applyToOpportunity
};
