
import Layout from '../components/Layout';
import ShowListSection from '../components/index/TrendingShows';
import Hero from '../components/index/Hero';

export default function Home ({ trendingShows }) {
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
                showList={trendingShows}
                route={`/api/tmdb/trending?page=`}
                title={`New Releases`}
                subTitle={``}
            />

        </Layout>
    );
}

export async function getStaticProps () {
    const res = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.TMDB_API_KEY}`);
    const trendingShows = await res.json();

    return {
        props: {
            trendingShows
        },
        revalidate: 1
    };
}
