const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    type: {
        type: String,
        required: true,
        enum: ['hackathon', 'project', 'job', 'internship', 'other']
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        default: 'Remote'
    },
    tags: [{
        type: String,
        trim: true
    }],
    deadline: {
        type: Date
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Opportunity', opportunitySchema);
