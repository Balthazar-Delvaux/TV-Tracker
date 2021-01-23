import { useState, createContext, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = props => {
    const [user, setUser] = useState({
        id: ``,
        username: ``
    });

    useEffect(async () => {
        const res = await fetch(`/api/users/user`, {
            method: `GET`,
            headers: {
                'Content-Type': `application/json`
            }
        });
        const json = await res.json();

        if (!json.success) return;

        const { user } = json;

        setUser({ id: user.id, username: user.username });
    }, []);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
};
