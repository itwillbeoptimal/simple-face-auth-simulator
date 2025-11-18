module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'babel-plugin-styled-components',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@': './src',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '../.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
