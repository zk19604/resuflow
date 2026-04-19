const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    cvRawText: {
        type: String,
        required: true,
    },
    cvFileName: {
        type: String,
    },
    cvMimeType: {
        type: String,
    },
    extractedData: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    config: {
        type: mongoose.Schema.Types.Mixed,
        default: {
            template: 'default',
            theme: 'light',
            sectionsVisible: {
                summary: true,
                workExperience: true,
                education: true,
                skills: true,
                projects: true,
                certifications: true,
                achievements: true,
                volunteering: true,
                publications: true,
                references: true,
                extras: true,
            },
        },
    },
    status: {
        type: String,
        enum: ['draft', 'complete', 'error'],
        default: 'draft',
    },
    extractionErrors: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
