const environment = process.env.NEXT_PUBLIC_ENV
let fast_origin = ''

console.log(`environment: ${environment}`)

if (environment == 'dev') {

    fast_origin = 'http://localhost:8001'
}
else if (environment == 'prod') {
    fast_origin = 'https://api.shrillecho.app'
}

export default fast_origin