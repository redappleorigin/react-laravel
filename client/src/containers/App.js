import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import Navigation from '../components/Navigation';

const App = ({children, ...props}) => {
    return (
        <div id="App">
            {/* Head Defaults */}
            <Helmet
                htmlAttributes={{
                    "lang": "en",
                    // "amp": undefined
                }} // amp takes no value
                title="My Title"
                titleTemplate="MySite.com - %s"
                defaultTitle="My Default Title"
                // base={{"target": "_blank", "href": "http://mysite.com/"}}
                meta={[
                    {
                        charset: "utf-8",
                    },
                    {
                        "http-equiv": "X-UA-Compatible",
                        "content": "IE=edge",
                    },
                    {
                        "name": "viewport",
                        "content": "width=device-width, initial-scale=1",
                    },
                ]}
                link={[
                    {
                        rel: "stylesheet",
                        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css",
                        integrity: "sha384-XdYbMnZ/QjLh6iI4ogqCTaIjrFk87ip+ekIjefZch0Y+PvJ8CDYtEs1ipDmPorQ+",
                        crossOrigin: "anonymous",
                    },
                    {
                        rel: "stylesheet",
                        href: "https://fonts.googleapis.com/css?family=Lato:100,300,400,700",
                    },
                    {
                        rel: "stylesheet",
                        href: "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css",
                        integrity: "sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7",
                        crossOrigin: "anonymous",
                    },
                ]}
            />

            <Navigation.Bar />

            {/* Renders the Page */}
            { children }
        </div>
    );
};

App.propTypes = {
    children: PropTypes.object.isRequired,
};

export default App;
