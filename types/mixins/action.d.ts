export namespace cardActionProps {
    namespace data {
        export const type: ObjectConstructor;
        function _default(): any;
        function _default(): any;
        export { _default as default };
    }
    namespace columns {
        const type_1: ArrayConstructor;
        export { type_1 as type };
        function _default(): any[];
        function _default(): any[];
        export { _default as default };
    }
    namespace columnOptions {
        const type_2: ObjectConstructor;
        export { type_2 as type };
        function _default(): {
            splitNum: number;
            padding: number;
        };
        function _default(): {
            splitNum: number;
            padding: number;
        };
        export { _default as default };
    }
    namespace actionOptions {
        const type_3: ObjectConstructor;
        export { type_3 as type };
        function _default(): {
            show: boolean;
            hMargin: number;
            atLeast: number;
            dropdown: {
                text: string;
            };
        };
        function _default(): {
            show: boolean;
            hMargin: number;
            atLeast: number;
            dropdown: {
                text: string;
            };
        };
        export { _default as default };
    }
    namespace titleData {
        const type_4: ObjectConstructor;
        export { type_4 as type };
        function _default(): {};
        function _default(): {};
        export { _default as default };
    }
}
export function ActionMixins(actionOptions: any, data: any, emitFn: any): {
    getTitleValue: (d: any) => any;
    getColumnValue: (col: any) => any;
    handleCommand: (btn: any, row: any) => void;
    handleList: import("vue").ComputedRef<any>;
    atLeast: import("vue").ComputedRef<number>;
    dropdownList: import("vue").ComputedRef<any>;
    buttons: import("vue").ComputedRef<any>;
};
export const actionEmits: string[];
