var Hapi = require('hapi');
var server = new Hapi.Server({
    host : 'localhost',
    port : Number(process.argv[2] || 8080)
})

server.route({
    path: '/{name}',
    method: 'GET',
    handler: (request, h) => {
        return `Hello ${request.params.name}`
    }
})

server.start();
console.log('Server running at:', server.info.uri)