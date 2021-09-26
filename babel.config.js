// babel.config.js
module.exports = {
    presets: [['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-typescript', // this needs to be configured as jest cannot work with ts out of the box
    ],
};