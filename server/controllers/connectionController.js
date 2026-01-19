const Connection = require('../models/Connection');
const User = require('../models/User');

// @desc    Get user connections
// @route   GET /api/connections
// @access  Private
const getConnections = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('connections', 'name avatar headline college');

        res.json(user.connections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Send connection request
// @route   POST /api/connections/request
// @access  Private
const sendConnectionRequest = async (req, res) => {
    try {
        const { recipientId } = req.body;

        // Check if request already exists
        const existingRequest = await Connection.findOne({
            $or: [
                { requester: req.user._id, recipient: recipientId },
                { requester: recipientId, recipient: req.user._id }
            ]
        });

        if (existingRequest) {
            return res.status(400).json({ message: 'Connection request already exists' });
        }

        const connectionRequest = await Connection.create({
            requester: req.user._id,
            recipient: recipientId
        });

        res.status(201).json(connectionRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Accept connection request
// @route   PUT /api/connections/accept/:id
// @access  Private
const acceptConnectionRequest = async (req, res) => {
    try {
        const connectionRequest = await Connection.findById(req.params.id);

        if (!connectionRequest) {
            return res.status(404).json({ message: 'Connection request not found' });
        }

        // Check if user is the recipient
        if (connectionRequest.recipient.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        connectionRequest.status = 'accepted';
        await connectionRequest.save();

        // Add to both users' connections
        await User.findByIdAndUpdate(connectionRequest.requester, {
            $addToSet: { connections: connectionRequest.recipient }
        });

        await User.findByIdAndUpdate(connectionRequest.recipient, {
            $addToSet: { connections: connectionRequest.requester }
        });

        res.json(connectionRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove connection
// @route   DELETE /api/connections/:userId
// @access  Private
const removeConnection = async (req, res) => {
    try {
        // Remove from both users' connections
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { connections: req.params.userId }
        });

        await User.findByIdAndUpdate(req.params.userId, {
            $pull: { connections: req.user._id }
        });

        // Delete connection request if exists
        await Connection.deleteOne({
            $or: [
                { requester: req.user._id, recipient: req.params.userId },
                { requester: req.params.userId, recipient: req.user._id }
            ]
        });

        res.json({ message: 'Connection removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get pending requests
// @route   GET /api/connections/requests
// @access  Private
const getPendingRequests = async (req, res) => {
    try {
        const requests = await Connection.find({
            recipient: req.user._id,
            status: 'pending'
        }).populate('requester', 'name avatar headline');

        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getConnections,
    sendConnectionRequest,
    acceptConnectionRequest,
    removeConnection,
    getPendingRequests
};
