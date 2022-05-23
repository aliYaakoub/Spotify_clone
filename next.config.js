/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: [
      'mosaic.scdn.co', 
      'i.scdn.co', 
      'daily-mix.scdn.co', 
      'lineup-images.scdn.co', 
      'seeded-session-images.scdn.co',
      'thisis-images.scdn.co',
      't.scdn.co'
    ]
  }
}
