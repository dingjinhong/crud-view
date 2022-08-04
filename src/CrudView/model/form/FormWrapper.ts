export default interface FormWrapper {
  mode: 'dialog' | 'drawer' // 可选drawer,
  props: Record<string, unknown>
}
