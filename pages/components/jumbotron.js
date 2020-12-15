import Image from 'next/image';

import genresIdList from '../../assets/genres.json';

export default function Jumbotron ({ props, showDetails }) {
    const show = props.results[0];
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
            <div className="z-40 relative top-60 w-full text-center">
                <h2 className="text-3xl font-bold">{show.name}</h2>
                <span>{year}</span>
                <span> | </span>
                <span>{genre.name}</span>
                <span> | </span>
                <span>{show.vote_average}</span>
            </div>
        </>
    );
}
