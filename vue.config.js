var webpack = require('webpack');

module.exports = {
	lintOnSave: false,
	productionSourceMap: false,
  //baseUrl: '/code/front',
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
  //devServer: {
  //  historyApiFallback: false
  //},
  chainWebpack: config => {
    config.module.rule('vue').uses.delete('cache-loader');
    config.module.rule('js').uses.delete('cache-loader');
    config.module.rule('ts').uses.delete('cache-loader');
    config.module.rule('tsx').uses.delete('cache-loader');
  }
}