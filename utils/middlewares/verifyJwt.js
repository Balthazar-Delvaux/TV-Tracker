import { verify } from 'jsonwebtoken';

export const verifyJWT = (req, res, next) => {
    const token = req.cookies.auth;

    if (!token) {
        res.status(401).json('Access Denied');
        return;
    }

    try {
        verify(token, process.env.JWT_SECRET_TOKEN);
        next();
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid token' });
    }
};
