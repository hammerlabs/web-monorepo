const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const glob = require("glob");

const parts = require("./webpack.parts");

const PATHS = {
  app: path.join(__dirname, "src"),
  console: path.join(__dirname, "src/console"),
  learn: path.join(__dirname, "src/learn"),
  build: path.join(__dirname, "dist"),
};

const commonConfig = merge([
  {
    output: {
      path: PATHS.build,
      filename: "[name].js",
    },
    resolveLoader: {
      alias: {
        "demo-loader": path.resolve(
          __dirname,
          "loaders/demo-loader.js"
        ),
      },
    },
    plugins: [new webpack.NamedModulesPlugin()],
  },
  parts.loadFonts({
    options: {
      name: "[name].[hash:8].[ext]",
    },
  }),
  parts.loadJavaScript({ include: PATHS.app }),
]);

const productionConfig = merge([
  {
    performance: {
      hints: "warning", // 'error' or false are valid too
      maxEntrypointSize: 100000, // in bytes
      maxAssetSize: 450000, // in bytes
    },
    output: {
      chunkFilename: "[name].[chunkhash:8].js",
      filename: "[name].[chunkhash:8].js",
    },
    recordsPath: path.join(__dirname, "records.json"),
  },
  parts.clean(PATHS.build),
  parts.minifyJavaScript(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
        // Run cssnano in safe mode to avoid
        // potentially unsafe transformations.
        safe: true,
      },
    },
  }),
  parts.extractBundles([
    {
      name: "vendor",
      minChunks: ({ resource }) => /node_modules/.test(resource),
    },
    {
      name: "manifest",
      minChunks: Infinity,
    },
  ]),
  parts.attachRevision(),
  parts.generateSourceMaps({ type: "source-map" }),
  parts.extractCSS({
    use: ["css-loader", parts.autoprefix()],
  }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: "[name].[hash:8].[ext]",
    },
  }),
  parts.setFreeVariable("process.env.NODE_ENV", "production"),
]);

const developmentConfig = merge([
  {
    output: {
      devtoolModuleFilenameTemplate:
        "webpack:///[absolute-resource-path]",
    },
  },
  parts.generateSourceMaps({
    type: "cheap-module-eval-source-map",
  }),
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
  parts.loadImages(),
]);

module.exports = env => {
  const pages = [
    parts.page({
      entry: {
        app: PATHS.app,
      },
      template: `${PATHS.app}/index.html`,
      chunks: ["app", "manifest", "vendor"],
    }),
    parts.page({
      path: "console",
      entry: {
        console: path.join(PATHS.console, "console.js"),
      },
      template: `${PATHS.console}/index.html`,
      chunks: ["console", "manifest", "vendor"],
    }),
    parts.page({
      path: "learn",
      template: `${PATHS.learn}/index.html`,
      entry: {
        learn: path.join(PATHS.learn, "learn.js"),
      },
      chunks: ["learn", "manifest", "vendor"],
    }),
  ];
  const config =
    env === "production" ? productionConfig : developmentConfig;

  return merge([commonConfig, config].concat(pages));
};
