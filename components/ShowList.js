import ShowItem from './ShowItem';

export default function ShowList ({ trendingShows }) {
    const listShowsItems = trendingShows.map((element, index) =>
        <ShowItem key={index} show={element} />
    );

    return (
        <div className="flex flex-wrap justify-around pt-6 px-2">{listShowsItems}</div>
    );
}
