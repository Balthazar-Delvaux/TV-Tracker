import { decode } from 'jsonwebtoken';

import { verifyJWT } from '../../../utils/middlewares/verifyJwt';
import { runMiddleware } from '../../../utils/middlewares/runMiddleware';
import dbConnect from '../../../utils/dbConnect';
import User from '../../../utils/models/User';

// Get user id and username when valid token provided
export default async function handler (req, res) {
    if (req.method !== `GET`) return res.status(405).json({ success: false, message: `Only supports GET request` });

    const token = req.cookies.auth;

    if (!token) return res.end();

    await runMiddleware(req, res, verifyJWT);

    await dbConnect();

    const payload = decode(req.cookies.auth, process.env.JWT_SECRET_TOKEN);

    const user = await User.findOne({ email: payload.email });

    return res.json({ success: true, user: { id: user._id, username: user.username } });
}
