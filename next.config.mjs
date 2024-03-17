/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /\/__tests__\// }));

    // Important: return the modified config
    return config;
  },
};

export default nextConfig;
