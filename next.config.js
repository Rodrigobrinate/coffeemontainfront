/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['animejs']);

const nextConfig = {
  port: 3002,
  reactStrictMode: true,
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

module.exports = withTM(nextConfig)
//module.exports = nextConfig

