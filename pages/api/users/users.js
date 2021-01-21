import { verifyJWT } from '../../../utils/middlewares/verifyJwt';
import { runMiddleware } from '../../../utils/middlewares/runMiddleware';

export default async function handler (req, res) {
    await runMiddleware(req, res, verifyJWT);

    res.json({ message: `oui` });
}
