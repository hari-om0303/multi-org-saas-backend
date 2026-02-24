const mongoos = require('mongoose');

const userSchema = new mongoos.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['SUPER_ADMIN', 'ORG_ADMIN', 'MEMBER'],
        default: 'MEMBER'
    },
    orgID: {
        type: mongoos.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
},
    {
        timestamps: true
    }
);

module.exports = mongoos.model('User' , userSchema);