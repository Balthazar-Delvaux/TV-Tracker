import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 15
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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
