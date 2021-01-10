import Router from 'next/router';
import { Provider } from 'next-auth/client';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import '../css/tailwind.css';

NProgress.configure({
    showSpinner: false
});

Router.events.on(`routeChangeStart`, () => NProgress.start());
Router.events.on(`routeChangeComplete`, () => NProgress.done());
Router.events.on(`routeChangeError`, () => NProgress.done());

function MyApp ({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            <Component {...pageProps} />;
        </Provider>
    );
}

export default MyApp;
