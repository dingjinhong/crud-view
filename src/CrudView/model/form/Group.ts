export default interface Group {
  type: 'collapse' //将来支持tabs
  props: Record<string, unknown>
  groups: Record<string, GroupItem>
}

export interface GroupItem {
  title: string
  disabled: boolean
  attrs: string[]
}
