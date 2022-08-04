import type Block from './Block';
import type FormHandle from './FormHandle';
import type FormWrapper from './FormWrapper';
import type Group from './Group';
export default interface Form {
    wrapper?: FormWrapper;
    props?: Record<string, unknown>;
    row?: Record<string, unknown>;
    handle?: FormHandle;
    group?: Group;
    blocks?: Block[];
}
