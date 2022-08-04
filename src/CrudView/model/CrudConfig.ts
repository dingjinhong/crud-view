import type Attr from './attr/Attr'
import type Card from './card/Card'
import type Form from './form/Form'
import type Pagination from './pagination/Pagination'
import type Search from './search/Search'
import type Table from './table/Table'
import type Toolbar from './toolbar/Toolbar'

export default interface CrudConfig {
  attrs: Record<string, Attr>
  search: Search
  table: Table
  toolbar: Toolbar
  pagination: Pagination
  form: Form
  addForm?: Form
  editForm?: Form
  viewForm?: Form
  cardView?: Card
}
