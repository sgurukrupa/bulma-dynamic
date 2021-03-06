'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');

const start = async () => {

    const server = Hapi.server({
        port: 3000,
        routes: {
            files: {
                relativeTo: Path.join(__dirname, '.')
            }
        }

    });

    await server.register(require('@hapi/inert'));

    server.route({
        method: 'GET',
        path: '/{fn*}',
        handler: function (request, h) {

            return h.file(request.params.fn);
        }
    });

    await server.start();

    console.log('Server running at:', server.info.uri);
};

start();