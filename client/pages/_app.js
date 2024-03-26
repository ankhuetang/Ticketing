import 'bootstrap/dist/css/bootstrap.css';

//this app component is the wrapper of all components inside pages
//global css should only be imported here
const app = ({Component, pageProps}) => {
    return <Component {...pageProps} />
}

export default app;