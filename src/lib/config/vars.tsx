const environment = process.env.NEXT_PUBLIC_ENV
export let fast_origin = ''
export let nest_origin = ''

console.log(`environment: ${environment}`)

if (environment == 'dev') {

    fast_origin = 'http://localhost:8001'
    nest_origin = 'http://localhost:5000'
}
else if (environment == 'prod') {
    fast_origin = 'http://fastapi_server:8001'
}

