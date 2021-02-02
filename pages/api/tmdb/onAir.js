export default async function handler (req, res) {
    if (req.method !== `GET`) {
        res.status(405).json({ success: false, message: `Only supports GET request` });
        return;
    }

    const {
        query: { page }
    } = req;

    const data = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}&page=${page}`);

    if (data.ok) {
        const dataJson = await data.json();
        res.status(200).json(dataJson);
    } else {
        res.status(404).end();
    }
}
