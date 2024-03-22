import webpack, { DefinePlugin } from 'webpack';
import { WebpackConf } from './../types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration, WebpackPluginInstance } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import path from 'path'

export const GetPlugins = (options: WebpackConf): Configuration['plugins'] => {
    const { paths, isDev, env } = options;
    const { publicPath, outputPath } = paths;
    const { platform, analyzer } = env;

    const devPlugins: WebpackPluginInstance[] = []
    const prodPlugins: WebpackPluginInstance[] = []

    // Only development plugins
    if (isDev) {
        const forkCheck = new ForkTsCheckerWebpackPlugin();
        const progressPlugin = new webpack.ProgressPlugin();
        const refreshPlugin = new ReactRefreshWebpackPlugin()
        devPlugins.push(forkCheck, progressPlugin, refreshPlugin);

        if (analyzer) {
            const bundleAnalyzer = new BundleAnalyzerPlugin();
            devPlugins.push(bundleAnalyzer);
        }
    }

    // Only production plugins
    if (!isDev) {
        const forkCheck = new CopyPlugin({
            patterns: [
                { from: path.resolve(publicPath, 'locales'), to: path.resolve(outputPath, 'locales') }
            ],
        })
        prodPlugins.push(forkCheck);
    }

    // Production/Development plugins
    const htmlPlugin = new HtmlWebpackPlugin({
        template: path.resolve(publicPath, 'index.html'),
        favicon: path.resolve(publicPath, 'header.ico'),
        publicPath: '/'
    });

    const definePlugin = new DefinePlugin({
        PLATFORM: JSON.stringify(platform)
    });

    const miniCssPlugin = new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/[name].[contenthash].css'
    });

    return [
        ...devPlugins,
        ...prodPlugins,
        htmlPlugin,
        definePlugin,
        miniCssPlugin
    ];
};
