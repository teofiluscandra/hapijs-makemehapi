const Hapi = require('hapi')
const Auth = require('hapi-auth-basic')

const user = {
    name : 'hapi',
    password : 'auth'
}

const validate = async (request, username, password, h) => {
    var isValid = username === user.name && password === user.password

    return {isValid: isValid, credentials: {name: user.name}}
}

;(async () => {
    try {
        const server = new Hapi.Server({
            host: 'localhost',
            port: Number(process.argv[2] || 8080)
        })

        await server.register(Auth)

        server.auth.strategy('simple','basic', {validate})
        server.auth.default('simple')

        server.route({
            method: 'GET',
            path: '/',
            handler: (request,h) => {
                return 'Welcome'
            }
        })

        await server.start()

    } catch (error) {
        console.log(error)
    }
})()