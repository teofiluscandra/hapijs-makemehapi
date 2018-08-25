var Hapi = require('hapi');
var server = new Hapi.Server({
    host : 'localhost',
    port : Number(process.argv[2] || 8080)
})

server.route({
    path: '/',
    method: 'GET',
    handler: (request, h) => {
        return 'Hello hapi'
    }
})

server.start();
console.log('Server running at:', server.info.uri)