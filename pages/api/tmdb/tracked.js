import { decode } from 'jsonwebtoken';

import User from '../../../utils/models/User';
import { runMiddleware } from "../../../utils/middlewares/runMiddleware";
import { verifyJWT } from "../../../utils/middlewares/verifyJwt";
import dbConnect from '../../../utils/dbConnect';

export default async function handler (req, res) {
    if (req.method !== `GET`) {
        res.status(405).json({ success: false, message: `Only supports GET request` });
        return;
    }

    let {
        query: { page }
    } = req;

    const pageSize = 5;

    if (page < 1) page = 1;

    await runMiddleware(req, res, verifyJWT);

    const payload = decode(req.cookies.auth, process.env.JWT_SECRET_TOKEN);

    await dbConnect();

    const user = await User.findOne({ email: payload.email });

    const trackedItems = user.tracked_items;

    const itemsIds = trackedItems.map(item => item.id);

    const itemsIdsPerPage = (itemsIds, pageNb, pageSize) => {
        const end = pageNb * pageSize;
        const start = end - pageSize;
        return itemsIds.slice(start, end);
    };

    const itemsDetails = Promise.all(itemsIdsPerPage(itemsIds, page, pageSize).map(
        async id => {
            const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}`);
            const data = await res.json();
            return data;
        }
    ));

    res.status(200).json(await itemsDetails);
}
