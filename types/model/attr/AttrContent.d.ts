import type PropsAttr from './PropsAttr';
export default interface AttrContent extends PropsAttr {
    formatter?: (row: any, column: any, value: any, index: number) => string;
}
