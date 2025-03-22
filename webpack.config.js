const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const fs = require("fs");
const webpack = require("webpack");
const packageJson = require("./package.json");

// Dynamically read the copyright text and replace placeholders
const copyrightText = fs
    .readFileSync(path.resolve(__dirname, "copyright"), { encoding: "utf8" })
    .replace("{year}", new Date().getFullYear().toString())
    .replace("{version}", packageJson.version)
    .replace("{date}", new Date().toISOString());

/**
 * @description - Webpack configuration function.
 * @param {object} env - Environment variables passed to the webpack config.
 * @param {object} argv - Command line arguments passed to the webpack config.
 * @returns {object} - Webpack configuration object.
 */
module.exports = (env, argv) => {
    // Determine environment based on 'env' parameter set in npm scripts
    const isProduction = argv.mode === "production";

    return {
        // Simplify console output to show minimal information
        stats: "minimal",

        // Entry point of our application
        entry: "./src/EntryPoint.ts",

        // Output configuration
        output: {
            path: path.resolve(__dirname, "dist"),                         // Output directory
            filename: isProduction ? "game-minified.js" : "game.js",       // Filename based on environment
        },

        // Development server configuration
        devServer: {
            compress: true,                                                // Enable gzip compression for better performance
            allowedHosts: "all",                                           // Allow all hosts,useful for testing across networks
            static: { directory: path.resolve(__dirname, "dist") },        // Serve static files from 'dist' directory
            client: {
                logging: "warn",                                           // Show warnings in console
                overlay: { errors: true, warnings: false },                // Show error overlay in browser
                progress: true,                                            // Display compilation progress
            },
            port: 8080,
            host: "0.0.0.0",                                               // Listen on all network interfaces
        },

        // Disable performance hints for larger game builds
        performance: { hints: false },

        // Enable source maps in development for easier debugging
        devtool: isProduction ? false : "source-map",

        // Optimization settings for production
        optimization: {
            minimize: isProduction,                           // Minify output in production
            splitChunks: false,                                            // Disable code splitting for simplicity
            runtimeChunk: false,                                           // Keep runtime code within the main bundle
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        ecma: 6,
                        compress: {
                            drop_console: isProduction,                    // Remove console logs in production builds
                            drop_debugger: isProduction,                   // Remove debugger statements in production builds
                        },
                        format: {
                            comments: (node, comment) => /Copyright|Ambika Information Technology LLC/i.test(comment.value),
                            beautify: false,                               // Minify output to keep file size minimal
                        },
                    },
                }),
            ],
        },

        // Module rules for processing different file types
        module: {
            rules: [
                {
                    test: /\.ts(x)?$/,                                     // Process TypeScript files
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
            ],
        },

        // Resolve file extensions for cleaner imports
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },

        // Webpack plugins
        plugins: [
            // Load environment variables from .env files based on environment
            new Dotenv({
                // Environment-specific .env file
                path: ".env.development",
                systemvars: true,                                            // Load system environment variables
                silent: true,                                                // Prevent errors if .env files are missing
            }),

            // Copy static assets to the output directory
            new CopyPlugin({
                patterns: [
                    { from: "./assets/", to: "assets/" },                   // Copy assets folder to 'dist/assets'
                    { from: "./css/", to: "css/" },                         // Copy css folder to 'dist/css'
                ],
            }),

            // Generate an index.html file with the correct script injection
            new HtmlWebpackPlugin({
                template: "src/index.html",                                 // Template HTML file
                hash: true,                                                 // Add unique hash to prevent caching issues
                inject: "body",                                             // Inject scripts at the bottom of the body
                minify: isProduction ? {                       // Minify HTML in production
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                } : false,
            }),

            // Add a dynamic copyright banner to the build files
            new webpack.BannerPlugin({
                raw: true,                                                  // Ensures the comment is added as-is
                banner: copyrightText,                                      // Dynamic copyright text
            }),
        ],
    };
};
