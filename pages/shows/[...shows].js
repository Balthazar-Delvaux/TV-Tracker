import Layout from '../../components/Layout';
import ShowItem from '../../components/ShowItem';

export default function ShowPage ({ showDetails }) {
    const {
        name,
        videos,
        first_air_date: firstAirData,
        recommendations,
        number_of_seasons: nbOfSeasons,
        vote_average: voteAverage,
        overview,
        in_production: inProduction
    } = showDetails;

    // Find a trailer from "videos" and then returns the YTB id as "key"
    const trailer = videos.results.find(element => element.site === `YouTube` && element.type === `Trailer`);

    const year = firstAirData.slice(0, 4);

    const listShowsItems = recommendations.results.map((element, index) =>
        <ShowItem key={index} show={element} />
    );

    return (
        <Layout navbarFixed={false}>
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
                <div className="w-full pt-4">
                    {trailer
                        ? <iframe
                            className="w-full h-full"
                            src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        : <div>No trailer available</div>
                    }
                </div>
                <div className="pt-4">
                    <span>{year}</span>
                    <span className="text-gray-600"> | </span>
                    <span>{nbOfSeasons} seasons</span>
                    <span className="text-gray-600"> | </span>
                    <span>
                        {inProduction
                            ? `Still in production`
                            : `Production Ended`
                        }
                    </span>
                </div>
                <div><button>Track it</button></div>
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
        fallback: `blocking`
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
