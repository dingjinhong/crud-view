import type SearchButton from '../ButtonHandle'

export default interface Search {
  show: boolean
  expandText?: string
  searchWhenChange?: boolean
  buttons?: SearchButton[]
  resetButton?: SearchButton
  submitButton?: SearchButton
}
