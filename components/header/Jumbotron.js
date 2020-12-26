import Image from 'next/image';

import genresIdList from '../../assets/genres.json';

export default function Jumbotron ({ showList }) {
    const show = showList.results[0];
    const year = show.first_air_date.slice(0, 4);
    const genre = genresIdList.genres.find(element => element.id === show.genre_ids[0]);

    return (
        <>
            <Image
                src={`https://image.tmdb.org/t/p/original${show.backdrop_path || show.poster_path}`}
                alt="hero img"
                layout="fill"
                objectFit="cover"
            />
            <div className="textShadow z-40 relative top-60 w-full text-center">
                <h2 className="textShadow text-3xl font-bold">{show.name}</h2>
                <span>{year}</span>
                <span> | </span>
                <span>{genre.name}</span>
                <span> | </span>
                <span>{show.vote_average}</span>
            </div>
            <div className="z-40 relative top-64 w-full text-center">
                <button className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">Watch Trailer</button>
            </div>

            <style jsx>{`
            .textShadow {
                text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
                }`}
            </style>
        </>
    );
}
