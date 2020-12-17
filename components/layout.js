import Head from 'next/head';

export default function Layout ({
    children,
    title = 'TV Tracker'
}) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {children}
            <footer>
                <div className="text-center bg-gray-900 py-6">
                    <p className="text-gray-500">Powered by <a rel="noopener noreferrer" href="https://www.themoviedb.org/">TheMovieDB</a></p>
                </div>
            </footer>
        </>
    );
}
