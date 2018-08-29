const Hapi = require('hapi')
const Joi = require('joi')

;(async () => {
    try {
        const server = new Hapi.Server({
            host: "localhost",
            port: Number(process.argv[2] || 8080)
        })
        
        server.route({
            path: '/chickens/{breed?}',
            method: 'GET',
            config: {
                handler: (request, h) => {
                    return `You asked for the ${request.params.breed}`
                },
                validate: {
                    params: {
                        breed: Joi.string().required()
                    }
                }
            }
        })

        await server.start()

    } catch (error){
        console.log(error)
    }
})()
