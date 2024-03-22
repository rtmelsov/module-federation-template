import { WebpackConf } from './../types/config'
import { Configuration } from 'webpack'

export const GetResolve = (options: WebpackConf): Configuration['resolve'] => {
    const { extensions, paths } = options
    const { components, pages, assets } = paths
    return {
        extensions,
        alias: {
            '@components': components,
            '@pages': pages,
            '@assets': assets,
        }
    }
}