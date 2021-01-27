import { verify } from 'jsonwebtoken';

export const verifyJWT = (req, res, next) => {
    const token = req.cookies.auth;

    if (!token) return res.status(401).json(`Access Denied`);

    try {
        verify(token, process.env.JWT_SECRET_TOKEN);
        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: `Invalid token` });
    }
};
