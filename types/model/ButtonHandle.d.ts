export default interface ButtonHandle {
    label?: string;
    disabled?: boolean;
    show?: boolean;
    topic?: string;
    icon?: string;
    order?: number;
    props?: Record<string, unknown>;
}
