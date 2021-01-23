import { decode } from 'jsonwebtoken';
import { verifyJWT } from '../../utils/middlewares/verifyJwt';
import { runMiddleware } from '../../utils/middlewares/runMiddleware';
import dbConnect from '../../utils/dbConnect';
import User from '../../utils/models/User';

// Get user id and username when valid token provided
export default async function handler (req, res) {
    if (req.method !== `POST`) return res.status(405).json({ success: false, message: `Only supports POST request` });

    const token = req.cookies.auth;

    if (!token) return res.status(403).json({ success: false, message: `Not logged in` });

    await runMiddleware(req, res, verifyJWT);

    await dbConnect();

    const payload = decode(req.cookies.auth, process.env.JWT_SECRET_TOKEN);

    try {
        const user = await User.findOne({ email: payload.email });

        // Only add the item if it is not in the array already
        const hasSameItemId = user.tracked_items?.some(item => item.id === req.body.itemId);

        if (hasSameItemId) return res.json({ success: false, message: `Item already tracked` });

        user.tracked_items.push({
            id: req.body.itemId,
            created_at: Date.now()
        });

        user.save();

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: `An error occured` });
    }
}
