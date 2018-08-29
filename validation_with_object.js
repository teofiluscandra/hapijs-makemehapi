const Hapi = require('hapi')
const Joi = require('joi')

;(async () => {
    try {
        const server = new Hapi.Server({
            host: 'localhost',
            port: Number(process.argv[2] || 8080)
        })

        var routeConfig = {
            path: '/login',
            method: 'POST',
            handler: (request, h) => {
                return 'login successful'
            },
            config: {
                validate: {
                    payload: Joi.object({
                        isGuest: Joi.boolean().required(),
                        username: Joi.string().when('isGuest', { is: false, then: Joi.required() }),
                        password: Joi.string().alphanum(),
                        accessToken: Joi.string().alphanum()
                    }).options({
                        allowUnknown: true
                    })
                    .without('password','accessToken')
                }
            }
        }

        server.route(routeConfig)

        await server.start()
    } catch (error) {
        console.log(error)
    }
})()