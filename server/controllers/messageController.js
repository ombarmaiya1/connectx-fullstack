const Message = require('../models/Message');

// @desc    Get all conversations
// @route   GET /api/messages/conversations
// @access  Private
const getConversations = async (req, res) => {
    try {
        const conversations = await Message.aggregate([
            {
                $match: {
                    $or: [
                        { sender: req.user._id },
                        { recipient: req.user._id }
                    ]
                }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $group: {
                    _id: {
                        $cond: [
                            { $eq: ['$sender', req.user._id] },
                            '$recipient',
                            '$sender'
                        ]
                    },
                    lastMessage: { $first: '$$ROOT' }
                }
            }
        ]);

        // Populate user details
        await Message.populate(conversations, {
            path: 'lastMessage.sender lastMessage.recipient',
            select: 'name avatar'
        });

        res.json(conversations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get messages with specific user
// @route   GET /api/messages/:userId
// @access  Private
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user._id, recipient: req.params.userId },
                { sender: req.params.userId, recipient: req.user._id }
            ]
        })
            .populate('sender', 'name avatar')
            .populate('recipient', 'name avatar')
            .sort({ createdAt: 1 });

        // Mark messages as read
        await Message.updateMany(
            {
                sender: req.params.userId,
                recipient: req.user._id,
                read: false
            },
            { read: true }
        );

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Send message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
    try {
        const { recipient, content } = req.body;

        const message = await Message.create({
            sender: req.user._id,
            recipient,
            content
        });

        const populatedMessage = await Message.findById(message._id)
            .populate('sender', 'name avatar')
            .populate('recipient', 'name avatar');

        res.status(201).json(populatedMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getConversations,
    getMessages,
    sendMessage
};
