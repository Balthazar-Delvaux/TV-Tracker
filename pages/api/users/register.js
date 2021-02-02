import dbConnect from '../../../utils/dbConnect';
import User from '../../../utils/models/User';
import { registerValidation } from '../../../utils/validation';
import { hashPassword } from '../../../utils/hash/hashPassword';

export default async function handler (req, res) {
    if (req.method !== `POST`) {
        res.status(405).json({ success: false, message: `Only supports POST request` });
        return;
    };

    if (req.cookies.auth) {
        res.json({ success: false, message: `Already logged in` });
        return;
    };

    await dbConnect();

    // Validate user
    const { error } = registerValidation(req.body);

    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    };

    // Check if email already exist
    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) {
        res.status(400).json({ error: `Email already registered` });
        return;
    };

    // Hash password
    const hashedPassword = await hashPassword(req.body.password);

    // Create new user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        await user.save();
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json(error);
    }
}
