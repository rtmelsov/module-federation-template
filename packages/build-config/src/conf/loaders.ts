import { WebpackConf } from './../types/config'
import { ModuleOptions } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshTypeScript from 'react-refresh-typescript'
import { RemoveDevIds } from './babelPluginsCustom/removeDevIds'


export const GetLoaders = (options: WebpackConf): ModuleOptions['rules'] => {
    const { isDev, env } = options
    const { babel } = env

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[contenthash:8]'
            },
        },
    }

    const stylesLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            cssLoaderWithModules,
            "sass-loader",
        ],
    }

    const typeScriptLoader = !babel && {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: require.resolve('ts-loader'),
                options: {
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                    }),
                },
            },
        ],
    }

    const svgLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{
            loader: '@svgr/webpack', options: {
                icon: true, svgoConfig: {
                    plugins: [
                        {
                            name: 'convertColors',
                            params: {
                                currentColor: true
                            }
                        }
                    ]
                }
            }
        }],
    }

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    const babelLoader = babel && {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-typescript',
                    [
                        '@babel/preset-react',
                        {
                            runtime: isDev ? 'automatic' : 'classic'
                        }
                    ]
                ],
                plugins: [
                    [
                        RemoveDevIds,
                        {
                            props: ['data-testID']
                        }
                    ]
                ]
            }
        }
    }

    return [
        babelLoader,
        stylesLoader,
        svgLoader,
        assetLoader,
        typeScriptLoader,
    ].filter(Boolean)
}