// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//     enabled: true,
// });

const config = {
    typescript: {
        ignoreDevErrors: true,
        ignoreBuildErrors: true,
    },
    trailingSlash: true,
    compress: true,
    webpack: (config, { webpack }) => {
        config.plugins.push(
            new webpack.IgnorePlugin(/\/__tests__\//),
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify("production"),
            })
        );

        config.externals.push("moment");

        return config;
    },
};

// module.exports = withBundleAnalyzer(config);
module.exports = config;
