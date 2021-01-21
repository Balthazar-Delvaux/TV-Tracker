import dbConnect from '../../../utils/dbConnect';
import User from '../../../utils/models/User';
import { registerValidation } from '../../../utils/validation';
import { hashPassword } from '../../../utils/hash/hashPassword';

export default async function handler (req, res) {
    if (req.method !== `POST`) return res.status(405).json({ success: false, message: `Not a POST request` });

    await dbConnect();

    // Validate user
    const { error } = registerValidation(req.body);

    if (error) return res.end().status(400).json({ error: error.details[0].message });

    // Check if email already exist
    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) return res.status(400).json({ error: `Email already registered` });

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
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(400).json(error);
    }
}
