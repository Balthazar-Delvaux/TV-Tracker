import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 30
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        max: 1024
    },
    tracked_items: [{
        id: {
            type: Number,
            required: true
        },
        genres: [{
            type: Number
        }],
        created_at: {
            type: Date,
            required: true
        }
    }]
}, { timestamps: true });

export default mongoose.models.User || mongoose.model(`User`, UserSchema);
