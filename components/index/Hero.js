import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';

import genresIdList from '../../assets/genres.json';
import { trackShow } from '../../utils/functions/trackShow';
import useUser from '../session/useUser';

export default function Hero ({ showList }) {
    const { user, mutate } = useUser();

    const show = showList.results[0];
    const year = show.first_air_date.slice(0, 4);
    const genre = genresIdList.genres.find(element => element.id === show.genre_ids[0]);

    const isTracked = user?.trackedItems.some(item => item.id === show.id);

    const nameTrimmed = show.name.split(' ').join('_');
    const slug = { id: show.id, name: nameTrimmed };

    const handleClick = async () => {
        const isLoggedIn = !!user?.id;
        const res = await trackShow(isLoggedIn, show.id, show.genre_ids);
        if (res.success) {
            mutate();
            return;
        }
        if (res.message === 'Not logged in') Router.push('/login');
    };

    return (
        <>
            <Image
                src={`https://image.tmdb.org/t/p/original${show.backdrop_path || show.poster_path}`}
                alt="hero img"
                layout="fill"
                objectFit="cover"
            />
            <div className="textShadow z-40 relative top-60 w-full text-center">
                <h2 className="text-3xl sm:text-4xl font-bold">{show.name}</h2>
                <div className="font-semibold pt-2">
                    <span>{year}</span>
                    <span> | </span>
                    <span>{genre.name}</span>
                    <span> | </span>
                    <span>{show.vote_average}</span>
                </div>
            </div>
            <div className="z-40 relative top-64 w-72 mx-auto text-center flex flex-col sm:flex-row">
                <Link href={`/shows/${slug.id}/${slug.name}`}>
                    <a className="border border-blue-500 bg-blue-500 w-32 rounded-md font-semibold px-2 py-2 mx-auto my-2 transition duration-500 ease select-none hover:bg-blue-600 focus:outline-none focus:shadow-outline">
                    Watch Trailer
                    </a>
                </Link>
                <button onClick={handleClick} className="border-2 bg-opacity-0 border-gray-200 bg-gray-600 w-32 rounded-md font-semibold textShadow px-2 py-2 mx-auto my-2 transition duration-500 ease select-none hover:bg-opacity-10 focus:outline-none focus:shadow-outline">
                    {isTracked ? 'Tracked' : 'Track It'}
                </button>
            </div>

            <style jsx>{`
            .textShadow {
                text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
                }`}
            </style>
        </>
    );
}
