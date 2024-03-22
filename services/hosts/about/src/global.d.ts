declare module '*.module.scss' {
    interface IClassName {
        [className: string]: string
    }

    const classNames: IClassName
    export = classNames
}

declare module "*.svg" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}
declare module "*.png"

declare const PLATFORM: 'desktop' | 'mobile'