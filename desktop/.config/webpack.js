const path = require('path');

const { WEB_DIR, IS_DEV_SERVER } = require('../../.config/webpack/helpers');
const config = require('../../.config/webpack/config');
const babel = require('../../.config/webpack/babel');

module.exports = (env, argv) => {

  if (typeof env) env = {};

  babel.presets.unshift(
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        targets: {
          electron: 3.0,
        },
      }
    ],
  );

  env.babel = babel;

  const configX = config(env, argv);

  configX.output.path = path.join(WEB_DIR, 'build');
  configX.resolve.alias['react-native$'] = 'react-native-electron';
  configX.target = 'electron-renderer';
  if (IS_DEV_SERVER) configX.devServer.port = 8083;

  return configX;
}
