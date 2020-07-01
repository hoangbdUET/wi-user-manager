const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin');

webpackConfigure = {
	entry: "./src/main.js",
	output: {
		path: path.join(__dirname, "dist"),
		filename: "main.bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV === 'development',
						}
					},
					"css-loader"
				]
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			},
			{
				test: /\.(png|jpg|gif|svg|eot|woff|ttf|svg|woff2)$/,
				use: {
				  loader: 'file-loader',
				  options: {
					name: '[name].[ext]',
					outputPath: './assets/' //define the output of the file (relative path to the workdir)
				  }
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			favicon: "./src/i2g_fav.png",
		}),
		new MiniCssExtractPlugin({
			filename: devMode ? '[name].css' : '[name].[hash].css',
			chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
		})
		// new CopyWebpackPlugin([
		// 	{from: 'src/assets', to:'assets'}
		// ])
	]
};

module.exports = webpackConfigure;
