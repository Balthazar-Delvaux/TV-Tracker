import Image from 'next/image';
import Link from 'next/link';
import genresIdList from '../assets/genres.json';

export default function ShowItem ({ show }) {
    const { name } = show;
    const year = show.first_air_date.slice(0, 4);
    const genre = genresIdList.genres.find(element => element.id === show.genre_ids[0]);

    const nameTrimmed = name.split(` `).join(`_`);
    const slug = { id: show.id, name: nameTrimmed };

    return (
        <Link href={`/shows/${slug.id}/${slug.name}`}>
            <a className="w-5/12 md:w-3/12 xl:w-1/5 2xl:w-56 p-4">
                <div className="max-w-max mx-auto">
                    <Image
                        className=""
                        src={`https://image.tmdb.org/t/p/original${show.poster_path}`}
                        alt={`Poster of "${name}"`}
                        width={200}
                        height={300}
                    />
                    <div>
                        <span className="text-xs text-gray-400">{year}, {genre.name}</span>
                        <h3 className="font-bold">{name}</h3>
                    </div>
                </div>
            </a>
        </Link>
    );
}
