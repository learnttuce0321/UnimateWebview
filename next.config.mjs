/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: './.next',
  swcMinify: true,

  env: {
    UNIMATE_NODE_ENV: process.env.NEXT_PUBLIC_UNIMATE_NODE_ENV,
    BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL,
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

  rewrites: async () => {
    if (process.env.NEXT_PUBLIC_UNIMATE_NODE_ENV === 'development') {
      return {
        beforeFiles: [
          {
            source: '/robots.txt',
            destination: '/robots-test.txt',
          },
        ],
      };
    }

    return {};
  },

  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
