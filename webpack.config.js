const pkg = require("./package.json");
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  const { service, development } = env;

  // @see https://webpack.kr/guides/environment-variables/
  const isDev = !!development;

  console.log("env :", env);
  console.log("isDev :", isDev);

  const entry = {
    main: {
      // main: ["./src/main.tsx"],
      main: {
        import: ["./src/main.tsx"],
        dependOn: "vendors",
      },
    },
    sub: {
      // sub: ["./src/sub.tsx"],
      sub: {
        import: ["./src/sub.tsx"],
        dependOn: "vendors",
      },
    },
  }[service];

  // FIXME:
  // 1. mini-css-extract-plugin : 앱에서 css를 분리하기 위해 사용
  // 2. 동적 import
  // @see https://webpack.js.org/guides/code-splitting/#dynamic-imports
  // 3. tree shaking

  const config = {
    entry: {
      // @see https://webpack.js.org/guides/code-splitting/#entry-dependencies
      // main, sub 청크에서 중복되는 모듈 공유
      vendors: ["lodash", "axios"],
      ...entry,
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].bundle.js",
      clean: true,
    },
    // @see https://webpack.js.org/guides/code-splitting/#splitchunksplugin
    // optimization: {
    //   splitChunks: {
    //     chunks: "all",
    //   },
    // },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: "asset/resource",
          generator: {
            filename: "./assets/images/[name]-[contenthash:12].[ext]",
          },
          /*
          loader: "file-loader",
          options: {
            // @see https://www.npmjs.com/package/file-loader
            // publicPath: "assets", // TODO: ?
            outputPath: "images",
            name: "[name]-[contenthash:12].[ext]",
          },
          */
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "./assets/fonts/[name]-[contenthash:12].[ext]",
          },
        },
      ],
    },
    plugins: [
      // 자체적으로 output.path 경로에 index.html 파일 생성
      new HtmlWebpackPlugin({
        // title: `${service}`,
        template: `./src/public/${service}.html`,
        filename: `${service}.html`,
      }),
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    devtool: isDev ? "eval-source-map" : "source-map",
    mode: isDev ? "development" : "production",
    devServer: {
      static: "./dist",
      port: 9000,
      hot: true,
    },
  };

  return config;
};
