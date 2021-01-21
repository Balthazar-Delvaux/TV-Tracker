import { serialize } from 'cookie';

export default async function handler (req, res) {
    res.setHeader(`Set-Cookie`, serialize(`auth`, ``, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== `development`,
        sameSite: `strict`,
        path: `/`,
        maxAge: -1
    }));

    return res.json({ success: true });
}
