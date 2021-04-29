
import Layout from '../components/Layout';
import ShowListSection from '../components/index/ShowListSection';
import Hero from '../components/index/Hero';

export default function Home ({ trendingShows, onAir }) {
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
                route={'/api/tmdb/trending?page='}
                title={'Trending Shows'}
                subTitle={'Most popular shows'}
            />

            <ShowListSection
                showList={onAir}
                route={'/api/tmdb/onAir?page='}
                title={'On The Air'}
                subTitle={'Next episode is coming this week'}
            />

        </Layout>
    );
}

export async function getStaticProps () {
    const fetchData = async request => {
        const res = await fetch(request);
        return (await res.json());
    };

    const trendingShows = await fetchData(`https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.TMDB_API_KEY}`);
    const onAir = await fetchData(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}`);

    return {
        props: {
            trendingShows,
            onAir
        },
        revalidate: 1
    };
}
