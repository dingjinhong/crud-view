export default interface Group {
    type: 'collapse';
    props: Record<string, unknown>;
    groups: Record<string, GroupItem>;
}
export interface GroupItem {
    title: string;
    disabled: boolean;
    attrs: string[];
}
