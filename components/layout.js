import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import disableScroll from 'disable-scroll';

const navheight = 16;

export default function Layout ({
    children,
    title = `TV Tracker`,
    navbarFixed = false
}) {
    // Side drawer menu
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        disableScroll[isOpen ? `on` : `off`]();
    }, [isOpen]);

    // Listen when scrolled over header and change navbar style
    const [header, setHeader] = useState(false);

    useEffect(() => {
        const listenScrollEvent = e => {
            const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
            const px = parseInt(window.getComputedStyle(document.getElementsByClassName(`computed`)[0])[`font-size`], 10);
            const heightRem = navheight / 4;
            const breakpoint = vh - px * heightRem;
            if (window.scrollY < breakpoint) {
                setHeader(false);
            } else if (window.scrollY > breakpoint) {
                setHeader(true);
            }
        };

        window.addEventListener(`scroll`, listenScrollEvent);

        return () => window.removeEventListener(`scroll`, listenScrollEvent);
    }, []);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <nav className={`computed flex ${navbarFixed ? `fixed z-10` : `static`} ${header ? `shadow-lg` : `bg-opacity-20`} transition duration-700 ease-in-out bg-gray-800 text-gray-200 w-full items-center justify-between px-6 h-${navheight}`}>

                {/* Left part of the Navbar */}
                <div className="flex items-center">

                    {/* SideBar Toggle */}
                    <button
                        className="px-2 sm:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg
                            className="fill-current h-5 w-5"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>

                    {/* Titre */}
                    <Link href="/">
                        <a className="mx-4 pb-1">
                            <h1 className="text-xl font-semibold">TV Tracker</h1>
                        </a>
                    </Link>

                    {/* Side Menu Drawer for small screens / Buttons in Navbar for large screens */}
                    <div
                        className={`transform-gpu sm:transform-none top-0 left-0 w-64 sm:w-auto h-full sm:h-auto bg-white sm:bg-transparent fixed sm:static overflow-auto sm:overflow-hidden ease-in-out transition-all sm:transition-none sm:flex duration-300 z-30 ${isOpen ? `translate-x-0` : `-translate-x-full`}`}
                    >
                        <Link href="/">
                            <a className="block sm:mx-4">Trending</a>
                        </Link>
                        <Link href="/">
                            <a className="block sm:mx-4">New</a>
                        </Link>
                        <Link href="/">
                            <a className="block sm:mx-4">Genre</a>
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
                    <div className="inline-block px-2 pt-1">
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='fill-current h-8 w-8 '
                            viewBox='0 0 512 512'
                        >
                            <title>Search</title>
                            <path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32'/>
                            <path fill='none' stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M338.29 338.29L448 448'/></svg>
                    </div>

                    {/* Login Button */}
                    <Link href="/login">
                        <div className="inline-block px-2 pt-1">

                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='fill-current h-8 w-8 font-normal'
                                viewBox='0 0 512 512'
                            >
                                <title>Person Circle</title>
                                <path d='M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm126.42 327.25a4 4 0 01-6.14-.32 124.27 124.27 0 00-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.24 124.24 0 00-32.35 29.58 4 4 0 01-6.14.32A175.32 175.32 0 0180 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 01-46.68 119.25z'/>
                                <path d='M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144z'/></svg>
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
