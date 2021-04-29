import Router from 'next/router';

import { trackShow } from '../../utils/functions/trackShow';
import Layout from '../../components/Layout';
import useUser from '../../components/session/useUser';
import ShowItem from '../../components/ShowItem';

export default function ShowPage ({ showDetails }) {
    const { user, isLoggedIn, mutate } = useUser();

    const {
        name,
        videos,
        first_air_date: firstAirData,
        recommendations,
        number_of_seasons: nbOfSeasons,
        vote_average: voteAverage,
        overview,
        in_production: inProduction,
        id
    } = showDetails;

    // Find a trailer from "videos" and then returns the YTB id as "key"
    const trailer = videos.results.find(element => element.site === 'YouTube' && element.type === 'Trailer');

    const year = firstAirData.slice(0, 4);

    const listShowsItems = recommendations.results.map((element, index) =>
        <ShowItem key={index} show={element} />
    );

    const isTracked = user?.trackedItems.some(item => item.id === id);

    const handleClick = async () => {
        const genresIds = showDetails.genres.map(item => item.id);
        const res = await trackShow(isLoggedIn, id, genresIds);
        if (res.success) {
            mutate();
            return;
        }
        if (res.message === 'Not logged in') Router.push('/login');
    };

    return (
        <Layout navbarFixed={false} title={`${name} - TV Tracker`}>
            <section className="px-4">
                <div className="pt-6">
                    <h1 className="text-2xl font-bold mt-auto ">{name}</h1>
                    <div className="flex flex-row align-baseline">
                        <div className="text-lg">
                            {voteAverage}
                        </div>
                        <div className="my-auto px-1 text-blue-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 fill-current"
                                viewBox="0 0 512 512"
                            >
                                <title>Star</title>
                                <path d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="sm:w-3/5">
                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                        {trailer
                            ? <iframe
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                width="560"
                                height="349"
                                src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            : <div>No trailer available</div>
                        }
                    </div>
                </div>
                <div className="pt-4">
                    <span>{year}</span>
                    <span className="text-gray-600"> | </span>
                    <span>{nbOfSeasons} seasons</span>
                    <span className="text-gray-600"> | </span>
                    <span>
                        {inProduction
                            ? 'Still in production'
                            : 'Production Ended'
                        }
                    </span>
                </div>
                <div>
                    <button onClick={handleClick} className="border-2 bg-gray-600 bg-opacity-10 border-gray-200 w-32 rounded-md font-semibold textShadow px-2 py-2 mx-auto mt-6 transition duration-500 ease select-none hover:bg-opacity-100 focus:outline-none focus:shadow-outline">
                        {isTracked ? 'Tracked' : 'Track It'}
                    </button>
                </div>
                <div className="py-2">
                    <h2 className="text-xl py-4">Description</h2>
                    <p className="">{overview}</p>
                </div>
            </section>

            <hr className="w-5/6 border-gray-400 m-auto mt-8"/>

            <section>
                <h2 className="text-2xl px-4 py-4">Recommended</h2>
                <div className="flex flex-wrap justify-around px-2">{listShowsItems}</div>
            </section>
        </Layout>
    );
}

export async function getStaticPaths () {
    return {
        paths: [],
        fallback: 'blocking'
    };
}

export async function getStaticProps ({ params }) {
    const { shows } = params;

    const res = await fetch(`https://api.themoviedb.org/3/tv/${shows[0]}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,recommendations,similar`);
    const showDetails = await res.json();

    if (res.status !== 200 || !showDetails) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            showDetails
        },
        revalidate: 1
    };
}
