/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: './.next',
  swcMinify: true,

  env: {
    UNIMATE_NODE_ENV: process.env.UNIMATE_NODE_ENV,
    BASE_API_URL: process.env.BASE_API_URL,
  },

  webpack: (config) => {
    config.resolve.modules = [...config.resolve.modules, '../src'];
    return config;
  },

  headers: async () => {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|jpeg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=31536000, max-age=0',
          },
        ],
      },
      {
        source: '/:all*(woff2|woff)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, immutable',
          },
        ],
      },
      {
        source: '/:all*(css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
