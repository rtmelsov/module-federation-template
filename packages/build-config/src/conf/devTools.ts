import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { WebpackConf } from './../types/config'

export const GetDevTools = (options: WebpackConf): DevServerConfiguration | undefined => {
    const { env, isDev } = options;
    const { port } = env;

    if (isDev) {
        return {
            port: port || '4000',
            open: true,
            historyApiFallback: true,
            hot: true
        };
    } else {
        return undefined;
    }
};
