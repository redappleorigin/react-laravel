const path = require('path');

module.exports = {
    CLIENT_ENTRY:  path.join(process.cwd(), 'resources/react/client.entry.js'),
    CLIENT_OUTPUT: path.join(process.cwd(), 'public/js'),
    SERVER_ENTRY:  path.join(process.cwd(), 'resources/react/server.entry.js'),
    SERVER_OUTPUT: path.join(process.cwd(), 'resources/server'),
    PUBLIC_PATH: '/js/'
};
