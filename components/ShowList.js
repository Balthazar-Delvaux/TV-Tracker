import useSWR from 'swr';
import { useEffect } from 'react';
import ShowItem from './ShowItem';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ShowList ({ initialData, route, count, onLoading }) {
    const pages = [];
    for (let i = 1; i <= count; i++) {
        pages.push(<Page index={i} key={i} route={route} initialData={initialData} onLoading={onLoading}/>);
    }

    return (
        <div className="flex flex-wrap justify-between pt-6 px-6">{pages}</div>
    );
}

const Page = ({ index, route, initialData, onLoading }) => {
    if (index !== 1) initialData = false;

    const { data, error } = useSWR(`${route}${index}`, fetcher, { initialData: initialData });

    useEffect(() => {
        onLoading(!data);
    }, [data]);

    if (error) return <div>failed to load</div>;
    if (!data) return true;

    return data.results.map(item => <ShowItem show={item} key={item.id}/>);
};
