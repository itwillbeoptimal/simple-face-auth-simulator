const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const config = {
    projectRoot: __dirname,
    watchFolders: [path.resolve(__dirname, '..')],
    resolver: {
        nodeModulesPaths: [
            path.resolve(__dirname, '..', 'node_modules'),
        ],
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
