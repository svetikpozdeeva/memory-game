import webpack from 'webpack'
import path from 'path'

module.exports = {
	output: {
		path: path.resolve(__dirname, 'dist/js'),
		filename: 'index.js',
		publicPath: 'js/'
	},
	watch: true,
	resolve: {
		modules: ['node_modules', 'src'],
		extensions: ['.js', '.pug', '.styl'],
		alias: {
            vue$: 'vue/dist/vue.common.js',
			img: path.resolve('./src/assets/img/')
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/, /dist/],
				use: ['babel-loader']
			}, {
				test: /\.styl$/,
				exclude: [/node_modules/, /dist/],
				use: [
					'style-loader',
					'css-loader',
					'stylus-loader'
				]
			}, {
				test: /\.pug$/,
				exclude: [/node_modules/, /dist/],
				use: ['pug-loader']
			}
		]
	}

}