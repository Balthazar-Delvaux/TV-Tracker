import { serialize } from 'cookie';

export default async function handler (req, res) {
    if (req.method !== `GET`) return res.status(405).json({ success: false, message: `Only supports GET request` });

    res.setHeader(`Set-Cookie`, serialize(`auth`, ``, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== `development`,
        sameSite: `strict`,
        path: `/`,
        maxAge: -1
    }));

    return res.json({ success: true });
}
