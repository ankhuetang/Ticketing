import buildClient from "../api/build-client";

//happens on browser
const LandingPage = ({ currentUser }) => {
    return currentUser ? <h1>Signed in</h1> : <h1>Not signed in</h1>
  };

//happens on server
//tell Next to call this function when rendering components in the server
//getInitialProps is Next.js specific, it is a function, not a component
LandingPage.getInitialProps = async (context) => {
    const client = buildClient(context);
    try {
        const {data} = await client.get('/api/users/currentuser');
        return data;
    } catch (err) {
        console.log(err);
    }
    
    return {};
};

export default LandingPage;