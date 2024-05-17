const { default: next } = require('next')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        domains: ['image-cdn-ak.spotifycdn.com']
    }
}

// module.exports = {
//     reactStrictMode: true,
//     swcMinify: true,
//     // webpack: (config, context) => {
//     //     if (process.env.NEXT_WEBPACK_USEPOLLING) {
//     //         config.watchOptions = {
//     //             poll: 500,
//     //             aggregateTimeout: 300
//     //         }
//     //     }
//     //     return config
//     // },
// }


module.exports = nextConfig