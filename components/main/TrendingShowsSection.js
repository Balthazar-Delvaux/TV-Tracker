import { useSWRInfinite } from 'swr';

import ShowItem from './ShowItem';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function TrendingShowsSection ({ showList }) {
    const { data, error, size, setSize } = useSWRInfinite(index => `/api/tmdb/trending?page=${index + 1}`, fetcher, { initialData: [showList], initialSize: 1, errorRetryCount: 3 });
    const trendingShows = [];

    if (data) {
        data.forEach(element => {
            trendingShows.push(...element.results);
        });
    }

    const isLoadingInitialData = !data && !error;
    const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === `undefined`);

    const listShowsItems = trendingShows.map((element, index) =>
        <ShowItem key={index} show={element} />
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
                <button disabled={isLoadingMore} onClick={() => setSize(size + 1)} className={`w-1/3 mx-auto my-6 border border-indigo-500 bg-indigo-500 text-white rounded-md py-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline`}>
                    {isLoadingMore
                        ? <svg className="animate-spin h-5 w-5 m-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        : `View more`}
                </button>
            </div>
        </section>
    );
}
