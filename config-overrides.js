const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

/**
 * React App Rewired Configuration
 * Used when running via react-app-rewired.
 * Seamlessly injects the dynamic build version and hash into the Webpack bundle.
 */
module.exports = function override(config, env) {
  let versionData = {};
  const versionPath = path.resolve(__dirname, 'src/version.json');
  
  if (fs.existsSync(versionPath)) {
    try {
      versionData = JSON.parse(fs.readFileSync(versionPath, 'utf8'));
    } catch (e) {}
  }

  // Ensure DefinePlugin has fresh build constants
  config.plugins = config.plugins || [];
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.REACT_APP_VERSION': JSON.stringify(versionData.fullVersion || ''),
      'process.env.REACT_APP_BUILD_HASH': JSON.stringify(versionData.buildHash || ''),
      'process.env.REACT_APP_BUILD_TIME': JSON.stringify(versionData.builtAt || ''),
    })
  );

  return config;
};
