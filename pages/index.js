import Jumbotron from '../components/header/jumbotron';
import Layout from '../components/layout';
import TrendingShowsSection from '../components/main/TrendingShowsSection';

export default function Home ({ trendingShows }) {
    return (
        <Layout navbarFixed={true}>
            {/* Header */}
            <header className="h-screen text-gray-200">

                {/* Jumbotron */}
                <div className="relative z-0 w-full h-full">
                    <Jumbotron props={trendingShows}/>
                </div>
            </header>
            <TrendingShowsSection props={trendingShows}/>

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
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every second
        revalidate: 1 // In seconds
    };
}
