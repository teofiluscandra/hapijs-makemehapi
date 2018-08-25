const Path = require('path');
const Hapi = require('Hapi');
const Inert = require('inert');

const provision = async () => {
    try {

    const server = new Hapi.Server({
        port: Number(process.argv[2] || 8080),
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });

    await server.register(Inert);

    server.route({
        method: 'GET',
        path: '/foo/bar/baz/{path*}',
        handler: {
            file: 'file.html'
        }
    });

    await server.start();

    console.log('Server running at:', server.info.uri);
 
    } catch(e) {
        console.log(e)
    }
};

provision();
