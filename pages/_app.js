import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import '../css/tailwind.css';
import { UserProvider } from '../components/context/UserContext';

NProgress.configure({
    showSpinner: false
});

Router.events.on(`routeChangeStart`, () => NProgress.start());
Router.events.on(`routeChangeComplete`, () => NProgress.done());
Router.events.on(`routeChangeError`, () => NProgress.done());

function MyApp ({ Component, pageProps }) {
    return (
        <UserProvider>
            <Component {...pageProps} />;
        </UserProvider>
    );
}

export default MyApp;
