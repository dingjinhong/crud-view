import type HandleDropdown from './HandleDropdown'
import type ButtonHandle from './ButtonHandle'

export default interface TableHandle {
  show: boolean
  atLeast: number // 多于多少个出现dropdown，
  props: Record<string, unknown>
  dropdown: HandleDropdown
  buttons: Record<string, ButtonHandle>
}
