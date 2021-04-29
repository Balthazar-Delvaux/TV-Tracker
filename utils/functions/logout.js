export const logout = async () => {
    await fetch('/api/users/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
