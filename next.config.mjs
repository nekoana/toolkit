/** @type {import('next').NextConfig} */
import CopyWebpackPlugin from "copy-webpack-plugin";

const nextConfig = {
  output: "export",
  webpack: (config, { webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /\/__tests__\// }),
    );

    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [{ from: "./node_modules/monaco-editor/min/vs", to: "../public/vs" }],
      }),
    );

    // Important: return the modified config
    return config;
  },
};

export default nextConfig;
