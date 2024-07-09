const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        pathname: '**',
      },
    ],
  },
  experimental: {
    reactCompiler: true,
  },
}

export default nextConfig
