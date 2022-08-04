import type CrudConfig from './model/CrudConfig';
declare const _default: {
    new (...args: any[]): {
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: Partial<{}> & Omit<Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
            config?: CrudConfig;
            data?: any[];
            total?: number;
        }>>> & {
            onSearch?: (...args: any[]) => any;
            "onAdd-form-submit"?: (...args: any[]) => any;
            "onEdit-form-submit"?: (...args: any[]) => any;
            "onView-form-submit"?: (...args: any[]) => any;
            "onAdd-form-cancel"?: (...args: any[]) => any;
            "onEdit-form-cancel"?: (...args: any[]) => any;
            "onView-form-cancel"?: (...args: any[]) => any;
            "onFire-toolbar-event"?: (...args: any[]) => any;
            "onFire-add-form-event"?: (...args: any[]) => any;
            "onFire-edit-form-event"?: (...args: any[]) => any;
            "onFire-view-form-event"?: (...args: any[]) => any;
            "onFire-remove"?: (...args: any[]) => any;
            "onFire-content-event"?: (...args: any[]) => any;
            "onFire-page-size-change"?: (...args: any[]) => any;
            "onFire-current-page-change"?: (...args: any[]) => any;
        } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, never>;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import("vue").Slot;
        }>;
        $root: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>;
        $parent: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>;
        $emit: (event: "search" | "add-form-submit" | "edit-form-submit" | "view-form-submit" | "add-form-cancel" | "edit-form-cancel" | "view-form-cancel" | "fire-toolbar-event" | "fire-add-form-event" | "fire-edit-form-event" | "fire-view-form-event" | "fire-remove" | "fire-content-event" | "fire-page-size-change" | "fire-current-page-change", ...args: any[]) => void;
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
            config?: CrudConfig;
            data?: any[];
            total?: number;
        }>>> & {
            onSearch?: (...args: any[]) => any;
            "onAdd-form-submit"?: (...args: any[]) => any;
            "onEdit-form-submit"?: (...args: any[]) => any;
            "onView-form-submit"?: (...args: any[]) => any;
            "onAdd-form-cancel"?: (...args: any[]) => any;
            "onEdit-form-cancel"?: (...args: any[]) => any;
            "onView-form-cancel"?: (...args: any[]) => any;
            "onFire-toolbar-event"?: (...args: any[]) => any;
            "onFire-add-form-event"?: (...args: any[]) => any;
            "onFire-edit-form-event"?: (...args: any[]) => any;
            "onFire-view-form-event"?: (...args: any[]) => any;
            "onFire-remove"?: (...args: any[]) => any;
            "onFire-content-event"?: (...args: any[]) => any;
            "onFire-page-size-change"?: (...args: any[]) => any;
            "onFire-current-page-change"?: (...args: any[]) => any;
        }, {
            onToolbarAdd: () => void;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("search" | "add-form-submit" | "edit-form-submit" | "view-form-submit" | "add-form-cancel" | "edit-form-cancel" | "view-form-cancel" | "fire-toolbar-event" | "fire-add-form-event" | "fire-edit-form-event" | "fire-view-form-event" | "fire-remove" | "fire-content-event" | "fire-page-size-change" | "fire-current-page-change")[], string, {}> & {
            beforeCreate?: (() => void) | (() => void)[];
            created?: (() => void) | (() => void)[];
            beforeMount?: (() => void) | (() => void)[];
            mounted?: (() => void) | (() => void)[];
            beforeUpdate?: (() => void) | (() => void)[];
            updated?: (() => void) | (() => void)[];
            activated?: (() => void) | (() => void)[];
            deactivated?: (() => void) | (() => void)[];
            beforeDestroy?: (() => void) | (() => void)[];
            beforeUnmount?: (() => void) | (() => void)[];
            destroyed?: (() => void) | (() => void)[];
            unmounted?: (() => void) | (() => void)[];
            renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
            renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
            errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>, info: string) => boolean | void)[];
        };
        $forceUpdate: () => void;
        $nextTick: typeof import("vue").nextTick;
        $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions<boolean>): import("vue").WatchStopHandle;
    } & Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
        config?: CrudConfig;
        data?: any[];
        total?: number;
    }>>> & {
        onSearch?: (...args: any[]) => any;
        "onAdd-form-submit"?: (...args: any[]) => any;
        "onEdit-form-submit"?: (...args: any[]) => any;
        "onView-form-submit"?: (...args: any[]) => any;
        "onAdd-form-cancel"?: (...args: any[]) => any;
        "onEdit-form-cancel"?: (...args: any[]) => any;
        "onView-form-cancel"?: (...args: any[]) => any;
        "onFire-toolbar-event"?: (...args: any[]) => any;
        "onFire-add-form-event"?: (...args: any[]) => any;
        "onFire-edit-form-event"?: (...args: any[]) => any;
        "onFire-view-form-event"?: (...args: any[]) => any;
        "onFire-remove"?: (...args: any[]) => any;
        "onFire-content-event"?: (...args: any[]) => any;
        "onFire-page-size-change"?: (...args: any[]) => any;
        "onFire-current-page-change"?: (...args: any[]) => any;
    } & import("vue").ShallowUnwrapRef<{
        onToolbarAdd: () => void;
    }> & {} & import("vue").ComponentCustomProperties;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    config?: CrudConfig;
    data?: any[];
    total?: number;
}>>> & {
    onSearch?: (...args: any[]) => any;
    "onAdd-form-submit"?: (...args: any[]) => any;
    "onEdit-form-submit"?: (...args: any[]) => any;
    "onView-form-submit"?: (...args: any[]) => any;
    "onAdd-form-cancel"?: (...args: any[]) => any;
    "onEdit-form-cancel"?: (...args: any[]) => any;
    "onView-form-cancel"?: (...args: any[]) => any;
    "onFire-toolbar-event"?: (...args: any[]) => any;
    "onFire-add-form-event"?: (...args: any[]) => any;
    "onFire-edit-form-event"?: (...args: any[]) => any;
    "onFire-view-form-event"?: (...args: any[]) => any;
    "onFire-remove"?: (...args: any[]) => any;
    "onFire-content-event"?: (...args: any[]) => any;
    "onFire-page-size-change"?: (...args: any[]) => any;
    "onFire-current-page-change"?: (...args: any[]) => any;
}, {
    onToolbarAdd: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("search" | "add-form-submit" | "edit-form-submit" | "view-form-submit" | "add-form-cancel" | "edit-form-cancel" | "view-form-cancel" | "fire-toolbar-event" | "fire-add-form-event" | "fire-edit-form-event" | "fire-view-form-event" | "fire-remove" | "fire-content-event" | "fire-page-size-change" | "fire-current-page-change")[], "search" | "add-form-submit" | "edit-form-submit" | "view-form-submit" | "add-form-cancel" | "edit-form-cancel" | "view-form-cancel" | "fire-toolbar-event" | "fire-add-form-event" | "fire-edit-form-event" | "fire-view-form-event" | "fire-remove" | "fire-content-event" | "fire-page-size-change" | "fire-current-page-change", {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: Record<string, {
        form: any;
        item: any;
    }> & Record<string, {
        form: any;
        item: any;
    }> & Record<string, {
        cellValue: any;
    }> & Record<string, {
        cellValue: any;
    }> & Record<string, {
        fd: any;
    }> & Record<string, {
        group: any;
    }> & Record<string, {
        fd: any;
    }> & Record<string, {
        group: any;
    }> & Record<string, {
        fd: any;
    }> & Record<string, {
        group: any;
    }> & {
        'search-before': (_: {}) => any;
        'search-show-before': (_: {
            form: {};
        }) => any;
        'search-show-after': (_: {
            form: {};
        }) => any;
        'search-show-action-after': (_: {
            form: {};
        }) => any;
        'search-hide-before': (_: {
            form: {};
        }) => any;
        'search-hide-after': (_: {
            form: {};
        }) => any;
        'search-after': (_: {}) => any;
        'toolbar-before': (_: {}) => any;
        'toolbar-content-left': (_: {}) => any;
        'toolbar-content-right': (_: {}) => any;
        'toolbar-after': (_: {}) => any;
        'table-content': (_: {
            options: Record<string, any>;
        }) => any;
        'multiple-column': (_: {
            options: Record<string, any>;
        }) => any;
        card: (_: any) => any;
        'card-title': (_: {
            titleData: any;
        }) => any;
        'add-form-item': (_: {
            fd: Record<string, any>;
            attr: any;
        }) => any;
    };
});
export default _default;
declare type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
declare type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
