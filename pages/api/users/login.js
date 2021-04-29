import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

import dbConnect from '../../../utils/dbConnect';
import User from '../../../utils/models/User';
import { loginValidation } from '../../../utils/validation';
import { verifyPassword } from '../../../utils/hash/hashPassword';

export default async function handler (req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ success: false, message: 'Only supports POST request' });
        return;
    }

    if (req.cookies.auth) {
        res.json({ success: false, message: 'Already logged in' });
        return;
    }

    await dbConnect();

    // Validate user
    const { error } = loginValidation(req.body);

    if (error) {
        res.status(400).json({ success: false, error: error.details[0].message });
        return;
    }

    // Check if user exist
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        res.status(400).json({ success: false, error: 'Email or password is wrong' });
        return;
    };

    // Verify password
    const matchPassword = await verifyPassword(user.password, req.body.password);

    if (!matchPassword) {
        res.status(400).json({ success: false, error: 'Email or password is wrong' });
        return;
    }

    // Assign JWT token
    const payload = {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt
    };
    const token = sign(payload, process.env.JWT_SECRET_TOKEN);

    res.setHeader('Set-Cookie', serialize('auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'Strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 * 52
    }));

    res.status(200).json({ success: true, user: { id: user._id, username: user.username } });
}
