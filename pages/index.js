
import Layout from '../components/Layout';
import ShowListSection from '../components/index/ShowListSection';
import Hero from '../components/index/Hero';

export default function Home ({ trendingShows, topRated }) {
    return (
        <Layout navbarFixed={true}>
            {/* Header */}
            <header className="h-screen">

                {/* Jumbotron */}
                <div className="relative z-0 w-full h-full">
                    <Hero showList={trendingShows}/>
                </div>

            </header>
            <ShowListSection
                showList={trendingShows}
                route={`/api/tmdb/trending?page=`}
                title={`Trending Shows`}
                subTitle={`Most popular shows this week`}
            />

            <ShowListSection
                showList={topRated}
                route={`/api/tmdb/toprated?page=`}
                title={`Top Rated`}
                subTitle={`Most popular shows of all time`}
            />

        </Layout>
    );
}

export async function getStaticProps () {
    // TODO: error handling
    const fetchData = async request => {
        const res = await fetch(request);
        return (await res.json());
    };

    const trendingShows = await fetchData(`https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.TMDB_API_KEY}`);
    const topRated = await fetchData(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.TMDB_API_KEY}`);

    return {
        props: {
            trendingShows,
            topRated
        },
        revalidate: 1
    };
}
