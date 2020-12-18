import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Layout ({
    children,
    title = `TV Tracker`,
    navbarFixed = false
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <nav className={`flex ${navbarFixed ? `fixed z-10` : `static`} w-full items-center justify-between px-6 h-16 bg-gray-800 bg-opacity-20 text-gray-800`}>

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
            {children}
            <footer>
                <div className="text-center bg-gray-900 py-6">
                    <p className="text-gray-500">Powered by <a rel="noopener noreferrer" href="https://www.themoviedb.org/">TheMovieDB</a></p>
                </div>
            </footer>
        </>
    );
}
