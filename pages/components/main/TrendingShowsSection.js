import Image from 'next/image';

export default function TrendingShowsSection ({ props }) {
    const trendingShows = props.results;
    const listShowsItems = trendingShows.map((element, index) =>
        <ShowItem key={index} props={element} />
    );

    return (<section className="bg-gray-700">
        <div className="text-center">
            <h2 className="text-2xl text-gray-100 pt-2">Trending Shows</h2>
            <p className="text-gray-500 py-4">Most popular shows this week</p>
        </div>
        <div className="w-96 m-auto h-px bg-gray-800"></div>
        <div className="flex flex-wrap justify-between py-6">{listShowsItems}</div>
    </section>
    );
}

export function ShowItem ({ props }) {
    console.log(`https://image.tmdb.org/t/p/original${props.poster_path}`);
    return (
        <div className="p-4">
            <Image
                src={`https://image.tmdb.org/t/p/original${props.poster_path}`}
                width={175}
                height={262}
            />
        </div>
    );
}
