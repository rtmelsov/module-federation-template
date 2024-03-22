import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import type { Configuration } from "webpack";
import { GetLoaders } from "./conf/loaders"
import { WebpackConf } from './types/config'
import { GetPlugins } from './conf/plugins';
import { GetDevTools } from './conf/devTools';
import { GetResolve } from "./conf/resolve";

const hosts = {
    'host': '3000',
    'admin': '3001',
    'shop': '3002',
}

export const BuildWebpackConf = (options: WebpackConf): Configuration => {
    const { env, paths, devtool } = options
    const { entryPath, outputPath, root } = paths
    const { mode } = env

    const config: Configuration = {
        context: root,
        mode: mode ?? 'development',
        entry: entryPath,
        output: {
            path: outputPath,
            filename: '[name].[contenthash].js',
            clean: true
        },
        module: {
            rules: GetLoaders(options),
        },
        resolve: GetResolve(options),
        plugins: GetPlugins(options),
        devtool,
        devServer: GetDevTools(options),
    }
    return config
}