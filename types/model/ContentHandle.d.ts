import type HandleDropdown from './HandleDropdown';
import type ButtonHandle from './ButtonHandle';
export default interface TableHandle {
    show: boolean;
    atLeast: number;
    props: Record<string, unknown>;
    dropdown: HandleDropdown;
    buttons: Record<string, ButtonHandle>;
}
