import Router from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { format } from 'date-fns';

import Layout from '../components/Layout';
import useUser from '../components/session/useUser';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Profile () {
    const { user, isLoading, isLoggedIn } = useUser();
    const [pageIndex, setPageIndex] = useState(1);

    // Redirect to /login if not logged in
    useEffect(() => {
        if (!isLoggedIn && !isLoading) {
            Router.replace(`/login`);
        }
    }, [isLoggedIn]);

    // Do not change page if goes below 0 or above pages containing items
    const changePage = newIndex => {
        const pageSize = 5;
        const pageMax = Math.ceil(user.trackedItems.length / pageSize);

        if (newIndex < 1) return;
        if (newIndex > pageMax) return;

        setPageIndex(newIndex);
    };

    return (
        <Layout title="Profile">
            {!isLoggedIn
                ? <div className="mx-auto py-8 w-max">You must be logged in</div>
                : <div className="p-8 m md:flex md:flex-wrap">

                    <div className="text-left px-8 md:flex-shrink-0">
                        <h2 className="text-2xl">{user.username}</h2>
                        <p>Joined: {format(new Date(user.createdAt), `dd/MM/yyyy`)} </p>
                        <hr className="w-1/3 md:w-48 border-gray-400 mr-auto sm:mr-auto sm:ml-0 mt-4"/>
                    </div>

                    <div className="p-4 m-4 md:my-0 bg-gray-700 rounded w-auto md:w-96">
                        <h2 className="text-xl">Tracked Shows</h2>
                        <div>
                            <Page index={pageIndex}/>
                        </div>
                        <div className="flex justify-center">
                            <button onClick={() => { changePage(pageIndex - 1); }} className="border border-gray-500 w-auto rounded-md font-semibold px-2 py-2 mx-2 my-2  transition duration-500 ease select-none focus:outline-none focus:shadow-outline">
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='fill-current h-6 w-6 font-normal'
                                    viewBox='0 0 512 512'>
                                    <title>Previous</title>
                                    <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M244 400L100 256l144-144M120 256h292'/>
                                </svg>
                            </button>
                            <button onClick={() => { changePage(pageIndex + 1); }} className="border border-gray-500 w-auto rounded-md font-semibold px-2 py-2 mx-2 my-2  transition duration-500 ease select-none focus:outline-none focus:shadow-outline">
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='fill-current h-6 w-6 font-normal'
                                    viewBox='0 0 512 512'>
                                    <title>Next</title>
                                    <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M268 112l144 144-144 144M392 256H100'/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            }
        </Layout>
    );
}

function Page ({ index }) {
    const { data, error } = useSWR(`/api/tmdb/tracked?page=${index}`, fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false });

    if (error) {
        return <>An Error Occured</>;
    }
    if (!data) {
        return <></>;
        // Add Loading
    }
    return data?.map(item => <div key={item.id} className="flex rounded bg-gray-800 my-4 p-2">
        <Image
            className="my-auto h-5/6 rounded"
            src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
            alt={`Poster of ${item.name}`}
            width={50}
            height={75}
        />
        <div className="px-4 my-auto">
            <h3 className="font-bold">{item.name}</h3>
            <p className="text-sm text-gray-400">{item.number_of_seasons} season{item.number_of_seasons > 1 ? `s` : ``}</p>
            <p className="text-sm text-gray-400">Next episode: { item.next_episode_to_air
                ? item.next_episode_to_air?.air_date
                : item.in_production
                    ? `Not provided yet`
                    : `Production ended`
            }
            </p>
        </div>
    </div>
    );
}
