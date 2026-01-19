const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Public
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password')
            .populate('connections', 'name avatar headline')
            .populate('followers', 'name avatar')
            .populate('following', 'name avatar');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields
        user.name = req.body.name || user.name;
        user.headline = req.body.headline || user.headline;
        user.bio = req.body.bio || user.bio;
        user.skills = req.body.skills || user.skills;
        user.college = req.body.college || user.college;
        user.location = req.body.location || user.location;
        user.avatar = req.body.avatar || user.avatar;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
            headline: updatedUser.headline,
            bio: updatedUser.bio,
            skills: updatedUser.skills,
            college: updatedUser.college,
            location: updatedUser.location
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Search users
// @route   GET /api/users/search?query=...
// @access  Public
const searchUsers = async (req, res) => {
    try {
        const query = req.query.query;

        const users = await User.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { headline: { $regex: query, $options: 'i' } },
                { skills: { $regex: query, $options: 'i' } }
            ]
        })
            .select('-password')
            .limit(20);

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get suggested connections
// @route   GET /api/users/suggested
// @access  Private
const getSuggestedUsers = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id);

        // Get users not already connected and not self
        const users = await User.find({
            _id: {
                $ne: req.user._id,
                $nin: currentUser.connections
            }
        })
            .select('-password')
            .limit(10);

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUserProfile,
    updateProfile,
    searchUsers,
    getSuggestedUsers
};
