import type ButtonHandle from '../ButtonHandle';
import type ToolbarHandle from './ToolbarHandle';
export default interface LeftToolbarHandle extends ToolbarHandle {
    addButton?: ButtonHandle;
}
