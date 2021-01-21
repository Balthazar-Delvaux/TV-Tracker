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
    }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model(`User`, UserSchema);
