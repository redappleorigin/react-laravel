import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

// This is only used for server rendering!!!
const Html = ({ head, css, initialState, ...props }) => {
    const attrs = head.htmlAttributes && head.htmlAttributes.toComponent() || [];
    const title = head.title && head.title.toComponent() || [];
    const meta = head.meta && head.meta.toComponent() || [];
    const link = head.link && head.link.toComponent() || [];

    const { sourceRequest } = initialState;
    const { protocol, host } = sourceRequest;
    const baseUrl = `${protocol}://${host}/`;
    // const script = head.script && head.script.toComponent() || [];

    return (
        <html { ...attrs }>
            <head>
                {/* Title */}
                { title }

                {/* Meta */}
                { meta }

                {/* Styles && Fonts */}
                { link }

                <style>{`
                    body {
                        font-family: 'Lato';
                    }

                    .fa-btn {
                        margin-right: 6px;
                    }
                `}</style>
            </head>

            <body id="app-layout">
                {/* App */}
                <div
                    id="root"
                    dangerouslySetInnerHTML={{ __html: props.html }}
                />

                {/* JavaScripts */}
                <script dangerouslySetInnerHTML={{__html: `window.renderedClassNames = ${JSON.stringify(css.renderedClassNames)};`}} />
                <script dangerouslySetInnerHTML={{__html: `window.INITIAL_STATE = ${JSON.stringify(initialState)};`}} />
                <script src={ baseUrl + "js/common.js" } />
                <script src={ baseUrl + "js/Client.js" } />

                <script
                    src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js"
                    integrity="sha384-I6F5OKECLVtK/BL+8iSLDEHowSAfUo76ZL9+kGAgTRdiByINKJaqTPH/QVNS1VDb"
                    crossOrigin="anonymous"
                />
                <script
                    src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min.js"
                    integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS"
                    crossOrigin="anonymous"
                />
            </body>
        </html>
    );
};

Html.propTypes = {
    head: PropTypes.object.isRequired,
    css: PropTypes.object.isRequired,
    initialState: PropTypes.object.isRequired,
    html: PropTypes.string.isRequired,
};

export default Html;
