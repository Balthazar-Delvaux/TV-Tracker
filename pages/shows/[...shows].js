import Layout from '../../components/layout';

export default function ShowPage ({ showDetails }) {
    const { name } = showDetails;
    return (
        <Layout>
            <section>
                <h1>{name}</h1>
                <p>{}</p>
            </section>
        </Layout>
    );
}

export async function getStaticPaths () {
    return {
        paths: [],
        fallback: `blocking`
    };
}

export async function getStaticProps ({ params }) {
    const { shows } = params;

    const res = await fetch(`https://api.themoviedb.org/3/tv/${shows[0]}?api_key=${process.env.TMDB_API_KEY}`);
    const showDetails = await res.json();

    if (res.status !== 200 || !showDetails) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            showDetails
        },
        revalidate: 1
    };
}
