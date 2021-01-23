import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function useUser () {
    const { data, error, mutate } = useSWR(`/api/users/session`, fetcher);

    const isLoggedIn = data?.success;
    const isLoading = !data && !error;

    return {
        isLoggedIn,
        user: data?.user,
        isLoading,
        mutate
    };
}
