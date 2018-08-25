const Vision = require('vision')
const Hapi = require('hapi')
const Path = require('path')

const server = new Hapi.Server({
    port : Number(process.argv[2] || 8080),
    host : 'localhost'
})

const provision = async () => {

    await server.register(Vision)
    server.views({
        engines: {
            html: require('handlebars')
        },
        path: Path.join(__dirname, 'templates')
    })

    server.route({
        method: 'GET',
        path: '/',
        handler: {
            view: "index.html"
        }
    })

    await server.start()
}

provision()