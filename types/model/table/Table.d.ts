import type TableHandle from './TableHandle';
export default interface Table {
    show: boolean;
    props: Record<string, unknown>;
    multiple: boolean;
    rowHandle: TableHandle;
}
