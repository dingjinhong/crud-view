import type ButtonHandle from '../ButtonHandle';
export default interface FormHandle {
    align: 'right' | 'left' | 'center';
    cancelButton?: ButtonHandle;
    confirmButton?: ButtonHandle;
    buttons?: ButtonHandle[];
}
