const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'src/blob.ts'),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: "blob.bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static:{ directory: __dirname,},
        port:9000
    }
}