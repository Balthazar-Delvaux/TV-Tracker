import Image from 'next/image';

import genresIdList from '../../assets/genres.json';

export default function TrendingShowsSection ({ props }) {
    const trendingShows = props.results;
    const listShowsItems = trendingShows.map((element, index) =>
        <ShowItem key={index} props={element} />
    );

    return (
        <section className="bg-gray-800">

            {/* Section title */}
            <div className="text-center">
                <h2 className="text-2xl text-gray-100 pt-2">Trending Shows</h2>
                <p className="text-gray-400 pt-2 pb-4">Most popular shows this week</p>
            </div>

            <hr className="w-5/6 border-gray-400 m-auto"/>

            {/* List of items */}
            <div className="flex flex-wrap justify-around pt-6 px-2">{listShowsItems}</div>

            {/* Button Show more */}
            <div className="text-center">
                <button className="w-1/3 mx-auto my-6 border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">View more</button>
            </div>

        </section>
    );
}

export function ShowItem ({ props }) {
    const { name } = props;
    const year = props.first_air_date.slice(0, 4);
    const genre = genresIdList.genres.find(element => element.id === props.genre_ids[0]);

    return (
        <div className="w-5/12 py-4">
            <Image
                className="max-w-full"
                src={`https://image.tmdb.org/t/p/original${props.poster_path}`}
                alt={`Poster of "${name}"`}
                width={200}
                height={300}
            />

            {/* Description */}
            <div>
                <span className="text-xs text-gray-400">{year}, {genre.name}</span>
                <h3 className="font-bold text-gray-100">{name}</h3>
            </div>
        </div>
    );
}
