export interface EnvVariables {
    mode?: 'development' | 'production'
    port: string
    analyzer?: boolean
    platform?: 'desktop' | 'mobile'
    babel: boolean
    SHOP_REMOTE_URL?: string
}

export interface Path {
    entryPath: string
    outputPath: string
    publicPath: string
    components: string
    router?: string
    assets: string
    pages: string
    root: string
}

export type federationSettings = {
    name: string
    dependencies: {
        [key: string]: string;
    }
}

export type WebpackConf = {
    paths: Path
    isDev: boolean
    devtool: 'inline-source-map' | false
    env: EnvVariables
    extensions: string[]
    packages?: federationSettings
    hostType?: 'remotes' | 'exposes'
}