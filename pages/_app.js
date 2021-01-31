import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';

import '../css/tailwind.css';

import AlertTemplate from '../utils/AlertTemplate';

NProgress.configure({
    showSpinner: false
});

Router.events.on(`routeChangeStart`, () => NProgress.start());
Router.events.on(`routeChangeComplete`, () => NProgress.done());
Router.events.on(`routeChangeError`, () => NProgress.done());

const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    transition: transitions.SCALE
};

function MyApp ({ Component, pageProps }) {
    return (
        <AlertProvider template={AlertTemplate} {...options}>
            <Component {...pageProps} />
        </AlertProvider>
    );
}

export default MyApp;
