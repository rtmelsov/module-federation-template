import { BuildWebpackConf, EnvVariables, Path, WebpackConf } from '@packages/build-config'
import path from 'path'
import packageJson from './package.json'
import webpack from 'webpack'
const root = path.resolve(__dirname)
const entryPath = path.resolve(__dirname, 'src')
const components = path.resolve(entryPath, 'components')
const pages = path.resolve(entryPath, 'pages')
const assets = path.resolve(entryPath, 'assets')
const router = path.resolve(entryPath, 'router', 'Router.tsx')

const publicPath = path.resolve(__dirname, 'public')
const outputPath = path.resolve(__dirname, 'build')

export default (env: EnvVariables) => {

    const isDev: boolean = env.mode === 'development'

    const devtool = isDev ? 'inline-source-map' : false

    const extensions: string[] = ['.tsx', '.ts', '.js']

    const paths: Path = {
        entryPath,
        outputPath,
        publicPath,
        components,
        assets,
        router,
        pages,
        root
    }

    const options: WebpackConf = {
        env: {
            mode: env.mode || 'development',
            port: env.port || '3000',
            analyzer: env.analyzer || false,
            babel: env.babel,
            platform: env.platform || 'desktop'
        },
        paths,
        devtool,
        extensions,
        hostType: 'remotes',
        isDev: isDev,
        packages: packageJson
    }

    const config = BuildWebpackConf(options)
    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'Container',
        filename: 'remoteEntry.js',

        remotes: {
            shop: `shop@http://localhost:3001/remoteEntry.js`,
            about: `about@http://localhost:3002/remoteEntry.js`,
        },
        shared: {
            ...packageJson.dependencies,
            react: {
                eager: true,
                requiredVersion: packageJson.dependencies['react'],
            },
            'react-router-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-router-dom'],
            },
            'react-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-dom'],
            },
        },
    }))

    return config;
}