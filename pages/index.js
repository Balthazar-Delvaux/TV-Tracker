import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import Jumbotron from '../components/header/jumbotron';
import Layout from '../components/layout';
import TrendingShowsSection from '../components/main/TrendingShowsSection';

export default function Home ({ trendingShows }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Layout>
            {/* Header */}
            <header className="h-screen text-gray-200">

                {/* Navbar */}
                <nav className="flex fixed w-full items-center justify-between px-6 h-16 bg-gray-800 bg-opacity-20 text-gray-800 z-10">

                    {/* Left part of the Navbar */}
                    <div className="flex items-stretch">

                        {/* SideBar Toggle */}
                        <button
                            className="px-3 py-2 sm:hidden"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <svg
                                className="fill-current h-4 w-4"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                            </svg>
                        </button>

                        {/* Logo */}
                        <div className="mx-4">
                            <h1 className="text-xl font-semibold">TV Tracker</h1>
                        </div>

                        {/* Side Menu Drawer for small screens / Buttons in Navbar for large screens */}
                        <div
                            className={`transform sm:transform-none top-0 left-0 w-64 sm:w-auto h-full sm:h-auto bg-white sm:bg-transparent fixed sm:static overflow-auto sm:overflow-hidden ease-in-out transition-all sm:transition-none sm:flex duration-300 z-30 ${isOpen ? `translate-x-0` : `-translate-x-full`}`}
                        >
                            <Link href="/">
                                <a className="block sm:mx-4">Movies</a>
                            </Link>
                            <Link href="/">
                                <a className="block sm:mx-4">TV Shows</a>
                            </Link>
                        </div>

                        {/* Opaque Layout for Side Menu Drawer */}
                        {isOpen
                            ? <div className="fixed inset-0 bg-black opacity-50 z-20 h-full overflow-auto" onClick={() => setIsOpen(!isOpen)} ></div>
                            : null}

                    </div>

                    {/* Search and Login Buttons */}
                    <div className="d-flex items-stretch">

                        {/* Search Button */}
                        <div className="inline-block mx-2 mt-1">
                            <Image
                                src="/assets/search-outline.svg"
                                height={32}
                                width={32}
                            />
                        </div>
                        {/* Login Button */}
                        <Link href="/login">
                            <div className="inline-block mx-2 mt-1">
                                <Image
                                    src="/assets/person-circle-outline.svg"
                                    height={32}
                                    width={32}
                                />
                            </div>
                        </Link>
                    </div>

                </nav>

                {/* Jumbotron */}
                <div className="relative z-0 w-full h-full">
                    <Jumbotron props={trendingShows}/>
                </div>
            </header>

            <TrendingShowsSection props={trendingShows}/>

        </Layout>
    );
}

export async function getStaticProps () {
    const res = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.TMDB_API_KEY}`);
    const trendingShows = await res.json();

    return {
        props: {
            trendingShows
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every second
        revalidate: 1 // In seconds
    };
}
