export type settingType = {
    name: string
    filename: string
    exposes?: {
        [key: string]: string
    }
    remotes?: {
        [key: string]: string
    }
    shared: any
}