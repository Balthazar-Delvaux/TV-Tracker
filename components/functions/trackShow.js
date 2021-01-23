export const trackShow = async (isLoggedIn, showId) => {
    if (!isLoggedIn) {
        return { success: false, message: `Not logged in` };
    }

    if (!showId) {
        return { success: false, message: `Show id not provided` };
    }

    const res = await fetch(`/api/track`, {
        method: `POST`,
        headers: {
            'Content-Type': `application/json`
        },
        body: JSON.stringify({
            itemId: showId
        })
    });
    const json = await res.json();

    if (json.success) return { success: true };

    return { success: false, message: json.message }; ;
};
