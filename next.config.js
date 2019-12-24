require('dotenv').config();
const withSass = require('@zeit/next-sass');
const webpack = require('webpack');

module.exports = withSass({
  webpack: (cfg) => {
    cfg.plugins.push(new webpack.EnvironmentPlugin(process.env));

    const originalEntry = cfg.entry;
    cfg.entry = async () => {
      const entries = await originalEntry();

      if (entries['main.js'] && !(entries['main.js'].indexOf('./client/polyfills.js') > -1)) {
        entries['main.js'].unshift('./client/polyfills.js');
      }

      return entries;
    };

    return cfg;
  },
});
