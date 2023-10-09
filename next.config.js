/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
      connectionString: "mongodb+srv://planteddeep:jtoq3fPbsdEdiegR@tpdorders.ehoval3.mongodb.net/?retryWrites=true&w=majority",
      secret: 'kjdfsoijblkas894jds0fsdklj'
  },
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api' // development api
          : 'http://localhost:3000/api' // production api
  }
}

module.exports = nextConfig
