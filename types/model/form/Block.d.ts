export default interface Block {
    items: string[];
}
export interface Visible {
    relationship: string;
    attrs: BlockAttr[];
}
export interface BlockAttr {
    key: string;
    value: string;
}
