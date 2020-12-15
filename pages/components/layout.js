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
        </>
    );
}
