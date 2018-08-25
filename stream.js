const Fs = require('fs')
const Hapi = require('hapi')
const Path = require('path')
const Rot13 = require('rot13-transform')

;(async () => {
    try {
        const server = new Hapi.Server({
            host: 'localhost',
            port: Number(process.argv[2] || 8080)
        })

        server.route({
            path: '/',
            method: 'GET',
            config: {
                handler: (req , h) => {
                    var file = Fs.createReadStream(Path.join(__dirname ,'streams/input.txt'))
                    return file.pipe(Rot13())
                }
            }
        })

        await server.start()
    } catch (error) {
        console.log(error)
    }
})()