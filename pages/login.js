import { useRef, useState, useEffect } from 'react';
import Router from 'next/router';
import validator from 'validator';

import Layout from '../components/Layout';
import useUser from '../components/session/useUser';

export default function Auth () {
    const [isLoginForm, setLoginForm] = useState(false);
    const { isLoggedIn } = useUser();

    // If already connected, redirect to homepage
    useEffect(() => {
        if (isLoggedIn) {
            Router.replace(`/`);
        }
    }, [isLoggedIn]);

    const switchForm = () => {
        setLoginForm(!isLoginForm);
    };

    return (
        <Layout title="Login - TV Tracker">
            <div className="py-8 sm:py-16">
                <div className="w-4/5 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 m-auto bg-white rounded-lg shadow-md lg:shadow-lg">
                    {isLoginForm
                        ? <RegisterForm switchForm = {switchForm}/>
                        : <LoginForm switchForm = {switchForm}/>
                    }
                </div>
            </div>
        </Layout>
    );
}

const RegisterForm = ({ switchForm }) => {
    const emailRef = useRef(``);
    const usernameRef = useRef(``);
    const passwordRef = useRef(``);

    const [emailValidationError, setEmailValidationError] = useState(false);
    const [usernameValidationError, setUsernameValidationError] = useState(false);
    const [passwordValidationError, setPasswordValidationError] = useState(false);

    const handleRegister = async e => {
        e.preventDefault();

        const user = {
            email: emailRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };

        if (!validator.isEmail(user.email)) {
            setEmailValidationError(true);
            return;
        };
        if (!validator.isByteLength(user.username, { min: 4, max: 15 })) {
            setUsernameValidationError(true);
            return;
        }
        if (!validator.isByteLength(user.password, { min: 8, max: 512 })) {
            setPasswordValidationError(true);
            return;
        }

        const res = await fetch(`/api/users/register`, {
            method: `POST`,
            headers: {
                'Content-Type': `application/json`
            },
            body: JSON.stringify(user)
        });
        const json = await res.json();
        console.log(json);
        if (json.success) {
            console.log(`c'est super`);
        }
    };

    return (
        <>
            <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">Register</h2>
            <form className="mt-10" >
                <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase">Email Address</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="email"
                    className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    ref={emailRef}
                    required
                />

                <label htmlFor="username" className="block text-xs font-semibold text-gray-600 uppercase">Username</label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    autoComplete="username"
                    className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    ref={usernameRef}
                    required
                    minLength={4}
                    maxLength={15}
                />

                <label htmlFor="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    ref={passwordRef}
                    required
                    minLength={8}
                    maxLength={512}
                />

                <button
                    className="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
                    onClick={handleRegister}
                >
                Continue
                </button>
                <div className="mt-8 sm:mb-4 text-sm text-center text-gray-500">
                    <p>Already registered? <button onClick={switchForm} className="underline">Sign in</button></p>
                </div>
            </form>
        </>
    );
};

const LoginForm = ({ switchForm }) => {
    const { mutate } = useUser();

    const emailRef = useRef(``);
    const passwordRef = useRef(``);

    const [emailValidationError, setEmailValidationError] = useState(false);
    const [passwordValidationError, setPasswordValidationError] = useState(false);

    const handleLogin = async e => {
        e.preventDefault();

        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        if (!validator.isEmail(user.email)) {
            setEmailValidationError(true);
            return;
        };
        if (!validator.isByteLength(user.password, { min: 8, max: 512 })) {
            setPasswordValidationError(true);
            return;
        }

        const res = await fetch(`/api/users/login`, {
            method: `POST`,
            headers: {
                'Content-Type': `application/json`
            },
            body: JSON.stringify(user)
        });
        const json = await res.json();
        if (json.success) {
            mutate();
            Router.push(`/`);
        }
    };
    return (
        <>
            <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">Login</h2>
            <form className="mt-10">
                <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase">Email Address</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="email"
                    className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    ref={emailRef}
                    required
                />

                <label htmlFor="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    ref={passwordRef}
                    required
                    minLength={8}
                    maxLength={512}
                />

                <button
                    className="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
                    onClick={handleLogin}
                >
                Continue
                </button>
                <div className="mt-8 sm:mb-4 text-sm text-center text-gray-500">
                    <p>Not registered yet? <button onClick={switchForm} className="underline">Sign up</button></p>
                </div>
            </form>
        </>
    );
};
