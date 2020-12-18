export default async function handler (req, res) {
    const {
        query: { page }
    } = req;

    const data = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.TMDB_API_KEY}&page=${page}`);
    if (data.ok) {
        const dataJson = await data.json();
        res.status(200).json(dataJson);
    } else {
        res.status(404);
    }
}
