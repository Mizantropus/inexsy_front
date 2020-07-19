var webpack = require('webpack');

module.exports = {
	lintOnSave: false,
	productionSourceMap: false,
	configureWebpack: {
		plugins: [
			new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery",
				'window.jQuery': 'jquery',
				Chartist: "chartist",
				Raphael: "raphael",
			})
		],
	},
  pwa: {
    workboxPluginMode: 'GenerateSW',
    skipWaiting: true,
    exclude: [/.*/]
  },
  chainWebpack: config => {
    config.module.rule('vue').uses.delete('cache-loader');
    config.module.rule('js').uses.delete('cache-loader');
    config.module.rule('ts').uses.delete('cache-loader');
    config.module.rule('tsx').uses.delete('cache-loader');
  }
}