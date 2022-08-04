import type AttrSearch from './AttrSearch'
import type AttrContent from './AttrContent'
import type AttrForm from './AttrForm'
import type CardAttr from './CardAttr'

export default interface Attr {
  search?: AttrSearch
  content?: AttrContent
  form?: AttrForm
  editForm?: AttrForm
  addForm?: AttrForm
  viewForm?: AttrForm
  cardTitle?: CardAttr
  cardDesc?: CardAttr
  cardImg?: CardAttr
}
