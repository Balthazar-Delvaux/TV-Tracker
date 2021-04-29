import { serialize } from 'cookie';

export default async function handler (req, res) {
    if (req.method !== 'GET') {
        res.status(405).json({ success: false, message: 'Only supports GET request' });
        return;
    }

    res.setHeader('Set-Cookie', serialize('auth', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'Strict',
        path: '/',
        maxAge: -1
    }));

    res.end();
}
