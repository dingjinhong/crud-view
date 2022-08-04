import type CardHandle from './CardHandle'
import type CardAttr from '../attr/CardAttr'

export interface CardOptions {
  titleData: TitleData
  columnOptions: ColumnOptions
  actionOptions: CardHandle
}
export interface TitleData {
  img?: string | CardAttr
  title?: string | CardAttr
  desc?: string | CardAttr
}
export interface ColumnOptions {
  splitNum: number
  padding: number
}
