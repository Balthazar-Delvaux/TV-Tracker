import { useState } from 'react';

import ShowList from '../ShowList';

export default function ShowListSection ({ showList, route, title, subTitle }) {
    const [count, setCount] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const id = () => title.replace(/\s/g, ``);

    return (
        <section id={id()}>
            {/* Section title */}
            <div className="text-center sm:text-left sm:px-10 sm:py-4">
                <h2 className="text-2xl pt-2">{title}</h2>
                {subTitle
                    ? <p className="text-gray-400 pt-2 pb-4">{subTitle}</p>
                    : ``}

                <hr className="w-5/6 sm:w-64 border-gray-400 mx-auto sm:mr-auto sm:ml-0 mt-4"/>
            </div>

            <ShowList initialData={showList} route={route} count={count} onLoading={setIsLoading}/>

            {/* Button Show more */}
            <div className="text-center">
                <button disabled={isLoading} onClick={() => setCount(count + 1)} className={`w-auto mx-auto my-6 border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline`}>
                    {isLoading
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
