// webpack.config.js

const path = require('path');

module.exports = {
    entry: './src/index.js', // Update this with your entry file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        resolve: {
            fallback: {
                "crypto": require.resolve("crypto-browserify"),
                "stream": require.resolve("stream-browserify"),
                "querystring": require.resolve("querystring-es3"),
                "os": require.resolve("os-browserify/browser"),
                "https": require.resolve("https-browserify"),
                "fs": false, // Assuming you don't need it in the frontend
                "net": false, // for https-proxy-agent
                "tls": false, // for https-proxy-agent
                "assert": false, // for https-proxy-agent
            }
        }
    }
    // Add other webpack configurations as needed
};
