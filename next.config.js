/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['animejs']);

const nextConfig = {
  port: 3002,
  reactStrictMode: true,
  env: { 
    //BACK_EDN_URL: process.env.BACK_EDN_URL, 
    //BASE_URL: process.env.BASE_URL,
    PROTOCOL:process.env.PROTOCOL,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    LOCAL_PORT: process.env.LOCAL_PORT,
  }, 
  pageExtensions: ['tsx', 'jsx', 'js'],
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
     ignoreDuringBuilds: true,
     page: true
     
  },
}

 withTM({
  webpack: (config) => {
    // configure o webpack para transpilar a biblioteca animejs
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/animejs/,
      ignoreBuildErrors: true,
      typescript: {
        page: true
      },
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    });

    return config;
  }
});

//module.exports = withTM(nextConfig)
module.exports = nextConfig

