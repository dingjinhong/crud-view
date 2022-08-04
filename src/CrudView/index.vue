<template>
  <div v-if="config" class="crud-viewer">
    <Search
      ref="search"
      :options="searchOptions"
      :show-list="searchShowList"
      :hide-list="searchHideList"
      @submit="onSubmit"
    >
      <template #search-before>
        <slot name="search-before" />
      </template>
      <template #search-show-before="{ form }">
        <slot name="search-show-before" v-bind="{ form }" />
      </template>
      <template #search-show-after="{ form }">
        <slot name="search-show-after" v-bind="{ form }" />
      </template>
      <template #search-show-action-after="{ form }">
        <slot name="search-show-action-after" v-bind="{ form }" />
      </template>
      <template #search-hide-before="{ form }">
        <slot name="search-hide-before" v-bind="{ form }" />
      </template>
      <template #search-hide-after="{ form }">
        <slot name="search-hide-after" v-bind="{ form }" />
      </template>
      <template #search-after>
        <slot name="search-after" />
      </template>
      <template
        v-for="col in searchShowList"
        #[`search-show-${col.key}`]="{ form, item }"
      >
        <slot :name="`search-show-${col.key}`" v-bind="{ form, item }" />
      </template>
      <template
        v-for="col in searchHideList"
        #[`search-hide-${col.key}`]="{ form, item }"
      >
        <slot :name="`search-hide-${col.key}`" v-bind="{ form, item }" />
      </template>
    </Search>
    <Toolbar
      v-bind="toolbar"
      @add="onToolbarAdd"
      @fire-event="onToolbarFireEvent"
    >
      <template #toolbar-before><slot name="toolbar-before" /></template>
      <template #toolbar-content-left
        ><slot name="toolbar-content-left"
      /></template>
      <template #toolbar-content-right>
        <slot name="toolbar-content-right" />
      </template>
      <template #toolbar-after>
        <slot name="toolbar-after" />
      </template>
    </Toolbar>
    <Table
      v-if="userTable"
      :options="tableOptions"
      class="crud-content"
      :table-data="data"
      :columns="columnList"
      @edit="onContentEdit"
      @view="onContentView"
      @remove="onContentRemove"
      @fire-event="onContentfireEvent"
    >
      <template #table-content="{ options }">
        <slot name="table-content" v-bind="{ options }" />
      </template>
      <template #multiple-column="{ options }">
        <slot name="multiple-column" v-bind="{ options }" />
      </template>
      <template v-for="col in columnList" #[`col-${col.key}`]="{ cellValue }">
        <slot :name="`col-${col.key}`" v-bind="{ cellValue }" />
        <!-- <el-table-column slot="multiple-column"><template slot-scope="scope">{{ scope.row }}</template></el-table-column> -->
      </template>
    </Table>
    <CardView
      v-else
      :card-view-options="cardViewOptions"
      :title-data="cardTitleData"
      class="crud-content"
      :data="data"
      :columns="columnList"
      @edit="onContentEdit"
      @view="onContentView"
      @remove="onContentRemove"
      @fire-event="onContentfireEvent"
    >
      <template #card="scope">
        <slot name="card" v-bind="scope" />
      </template>
      <template #title="{ titleData: td }">
        <slot name="card-title" :title-data="td" />
      </template>
      <template v-for="col in columnList" #[`col-${col.key}`]="{ cellValue }">
        <slot :name="`col-${col.key}`" v-bind="{ cellValue }" />
        <!-- <el-table-column slot="multiple-column"><template slot-scope="scope">{{ scope.row }}</template></el-table-column> -->
      </template>
    </CardView>
    <div class="pagination-container" :class="pagination.right ? 'right' : ''">
      <el-pagination
        v-if="pagination.show"
        v-bind="pagination.props"
        :page-size="pageSize"
        :current-page="currentPage"
        class="pagination"
        :total="total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      />
    </div>
    <component
      :is="
        addForm.wrapper && addForm.wrapper.mode
          ? `el-${addForm.wrapper.mode}`
          : 'el-dialog'
      "
      v-if="addForm && addFormShow"
      v-model="addFormShow"
      v-bind="addForm.wrapper ? addForm.wrapper.props || {} : {}"
    >
      <Form
        :form-data="formData"
        :is-view="false"
        v-bind="addForm.config"
        @fire-event="(...args:[string,object]) => onFormFireEvent(...args, 'add')"
        @submit="onFormSubmit($event, 'add')"
        @cancel="onFormCancel('add')"
      >
        <!-- <div slot="form-a" slot-scope="{fd}">{{ haha(fd) }}</div> -->
        <template #form-item="{ fd, attr }">
          <slot name="add-form-item" v-bind="{ fd, attr }" />
        </template>
        <template v-for="item in addFormItems" #[`form-${item}`]="{ fd }">
          <slot :name="`add-form-${item}`" :fd="fd" />
        </template>
        <!-- </slot> -->
        <template
          v-for="title in addFormGroupTitle"
          #[`${title}-group-title`]="{ group }"
        >
          <slot :name="'add-' + title + '-group-title'" v-bind="{ group }" />
        </template>
      </Form>
    </component>
    <component
      :is="
        viewForm.wrapper && viewForm.wrapper.mode
          ? `el-${viewForm.wrapper.mode}`
          : 'el-dialog'
      "
      v-if="viewForm && viewFormShow"
      key="view"
      v-model="viewFormShow"
      v-bind="viewForm.wrapper ? viewForm.wrapper.props || {} : {}"
    >
      <Form
        :form-data="formData"
        :is-view="true"
        v-bind="viewForm.config"
        @fire-event="(...args:[string,object]) => onFormFireEvent(...args, 'view')"
        @cancel="onFormCancel('view')"
      >
        <template v-for="item in viewFormItems" #[`form-${item}`]="{ fd }">
          <slot :name="`view-form-${item}`" v-bind="{ fd }" />
        </template>
        <template
          v-for="title in viewFormGroupTitle"
          #[`${title}-group-title`]="{ group }"
        >
          <slot :name="'view-' + title + '-group-title'" v-bind="{ group }" />
        </template>
      </Form>
    </component>
    <component
      :is="
        editForm.wrapper && editForm.wrapper.mode
          ? `el-${editForm.wrapper.mode}`
          : 'el-dialog'
      "
      v-if="editForm && editFormShow"
      v-model="editFormShow"
      v-bind="editForm.wrapper ? editForm.wrapper.props || {} : {}"
    >
      <Form
        :form-data="formData"
        :is-view="false"
        v-bind="editForm.config"
        @fire-event="(...args:[string,object]) => onFormFireEvent(...args, 'edit')"
        @submit="onFormSubmit($event, 'edit')"
        @cancel="onFormCancel('edit')"
      >
        <template v-for="item in editFormItems" #[`form-${item}`]="{ fd }">
          <slot :name="`edit-form-${item}`" v-bind="{ fd }" />
        </template>
        <template
          v-for="title in editFormGroupTitle"
          #[`${title}-group-title`]="{ group }"
        >
          <slot :name="'edit-' + title + '-group-title'" v-bind="{ group }" />
        </template>
      </Form>
    </component>
  </div>
</template>
<script lang="ts">
import { ElDialog, ElDrawer } from 'element-plus'
export default {
  name: 'CurdView',
  components: {
    ElDialog,
    ElDrawer
  }
}
</script>
<script setup lang="ts">
import Search from './search.vue'
import Table from './table.vue'
import Form from './form.vue'
import Toolbar from './toolbar.vue'
import CardView from './CardView.vue'
import { find, cloneDeep } from 'lodash'
import { watch, ref, shallowRef } from 'vue'
import type CrudConfig from './model/CrudConfig'
import type Pagination from './model/pagination/Pagination'
import type { TitleData } from './model/card/CardOptions'
import { ElPagination } from 'element-plus'

//interface CurdProp
const props = defineProps<{
  config?: CrudConfig
  data?: any[]
  total?: number
}>()
// const props = defineProps({
//   config: {
//     type: Object,
//     default() {
//       return null
//     }
//   },
//   data: {
//     type: Array,
//     default() {
//       return []
//     }
//   },
//   total: {
//     type: Number,
//     default: 100
//   }
// })

const columnList = shallowRef([])
const addFormItems = shallowRef([])
const addFormGroupTitle = ref([])
const viewFormItems = shallowRef([])
const viewFormGroupTitle = ref([])
const editFormItems = shallowRef([])
const editFormGroupTitle = ref([])
const searchShowList = shallowRef([])
const searchHideList = shallowRef([])
const userTable = ref(false)
const tableOptions = ref(null)
const cardViewOptions = ref(null)
const searchOptions = ref(null)
const addFormShow = ref(false)
const viewFormShow = ref(false)
const editFormShow = ref(false)
const addForm = shallowRef(null)
const viewForm = shallowRef(null)
const editForm = shallowRef(null)
const formData = ref({})
const toolbar = ref({})
const pagination = ref<Pagination>({
  show: true,
  props: {},
  right: true
})
const currentPage = ref(1)
const pageSize = ref(20)
const cardTitleData = ref<TitleData>({})
const _getFormItem = (form) => {
  const items = []
  if (form) {
    if (form.base && form.base.length) {
      form.base.forEach((b) => {
        items.push(b.key)
      })
    }
    if (form.group && form.group.groups && form.group.groups.length) {
      form.group.groups.forEach((b) => {
        if (b.attrs && b.attrs.length) {
          b.attrs.forEach((a) => {
            items.push(a.key)
          })
        }
      })
    }
  }
  return items
}
const _getFormGroupTitle = (form) => {
  const titles = []
  if (form.group && form.group.groups && form.group.groups.length) {
    form.group.groups.forEach((b) => {
      titles.push(b.groupKey)
    })
  }
  return titles
}
const _getForm = (tempForm, currentForm, attrList) => {
  let form = null
  if (tempForm) {
    const { wrapper: tempFormWrapper, ...tempFormOther } = tempForm
    const { wrapper: currentFormWrapper, ...currentFormOther } = currentForm
    form = {
      wrapper: currentFormWrapper || tempFormWrapper,
      config: {
        ...tempFormOther,
        ...currentFormOther
      }
    }
  } else {
    const { wrapper: currentFormWrapper, ...currentFormOther } = currentForm
    form = {
      wrapper: currentFormWrapper,
      config: {
        ...currentFormOther
      }
    }
  }
  const configGroup = { ...form.config.group }
  form.config.group = configGroup
  if (configGroup && configGroup.groups) {
    const groupList = []
    for (const key in configGroup.groups) {
      const group = configGroup.groups[key]
      const { attrs, ...other } = group
      if (attrs && attrs.length) {
        const formAttrList = []
        attrs.forEach((a) => {
          const f = find(attrList, { key: a })
          if (f) {
            formAttrList.push(f)
            const index = attrList.indexOf(f)
            if (index !== -1) {
              attrList.splice(index, 1)
            }
          }
        })
        if (formAttrList.length > 0) {
          const ng = {
            ...other,
            attrs: formAttrList,
            groupKey: key
          }
          groupList.push(ng)
        }
      }
    }
    if (groupList.length > 0) {
      configGroup.groups = groupList
    } else {
      delete form.config.group
    }
  }
  form.config.base = attrList
  return form
}
watch(
  () => props.config,
  (n) => {
    if (n) {
      tableOptions.value = n.table
      cardViewOptions.value = n.cardView
      if (n.table) {
        userTable.value = true
      } else {
        if (n.cardView) {
          userTable.value = false
        } else {
          userTable.value = true
        }
      }
      searchOptions.value = n.search
      const ctd =
        n.cardView && n.cardView.cardOptions && n.cardView.cardOptions.titleData
          ? { ...n.cardView.cardOptions.titleData }
          : {}
      const shl = []
      const ssl = []
      const columns = []
      const addFormAttrs = []
      const viewFormAttrs = []
      const editFormAttrs = []
      toolbar.value = n.toolbar || {}
      if (n.attrs && typeof n.attrs === 'object') {
        for (const key in n.attrs) {
          const a = n.attrs[key]
          if (a.cardTitle) {
            const cardTitle = { ...a.cardTitle }
            cardTitle.key = key
            ctd.title = cardTitle
          }
          if (a.cardDesc) {
            const cardDesc = { ...a.cardDesc }
            cardDesc.key = key
            ctd.desc = cardDesc
          }
          if (a.cardImg) {
            const cardImg = { ...a.cardImg }
            cardImg.key = key
            ctd.img = cardImg
          }
          if (a.search) {
            const search = { ...a.search }
            search.key = key
            if (a.search.inHide) {
              shl.push(search)
            } else {
              ssl.push(search)
            }
          }
          if (a.content) {
            const content = { ...a.content }
            content.key = key
            columns.push(content)
          }
          const formAttr = a.form
          if (a.addForm) {
            const addFormAttr = {
              ...(formAttr || {}),
              ...a.addForm
            }
            addFormAttr.key = key
            addFormAttrs.push(addFormAttr)
          }
          if (a.viewForm) {
            const viewFormAttr = {
              ...(formAttr || {}),
              ...a.viewForm
            }
            viewFormAttr.key = key
            viewFormAttrs.push(viewFormAttr)
          }
          if (a.editForm) {
            const editFormAttr = {
              ...(formAttr || {}),
              ...a.editForm
            }
            editFormAttr.key = key
            editFormAttrs.push(editFormAttr)
          }
        }
      }
      // console.log('addFormAttrs',
      //   addFormAttrs)
      addFormAttrs.sort((a, b) => {
        return b.order || 0 - a.order || 0
      })
      viewFormAttrs.sort((a, b) => {
        return b.order || 0 - a.order || 0
      })
      editFormAttrs.sort((a, b) => {
        return b.order || 0 - a.order || 0
      })
      shl.sort((a, b) => {
        return b.order || 0 - a.order || 0
      })
      ssl.sort((a, b) => {
        return b.order || 0 - a.order || 0
      })
      columns.sort((a, b) => {
        return b.order || 0 - a.order || 0
      })
      searchHideList.value = shl
      searchShowList.value = ssl
      columnList.value = columns

      const form = n.form
      if (n.addForm) {
        addForm.value = _getForm(form, n.addForm, addFormAttrs)
        addFormItems.value = _getFormItem(addForm.value.config)
        addFormGroupTitle.value = _getFormGroupTitle(addForm.value.config)
      }
      if (n.viewForm) {
        viewForm.value = _getForm(form, n.viewForm, viewFormAttrs)
        viewFormItems.value = _getFormItem(viewForm.value.config)
        viewFormGroupTitle.value = _getFormGroupTitle(viewForm.value.config)
      }
      if (n.editForm) {
        editForm.value = _getForm(form, n.editForm, editFormAttrs)
        editFormItems.value = _getFormItem(editForm.value.config)
        editFormGroupTitle.value = _getFormGroupTitle(editForm.value.config)
      }
      pagination.value = n.pagination
      pageSize.value = (n.pagination?.props?.pageSize as number) || 20
      cardTitleData.value = ctd
    }
  },
  { immediate: true, deep: true }
)

// form event
// const emit = defineEmits<{
//   (e: 'add-form-submit', form: number, resolve: (res: any) => void): void
//   (e: 'update', value: string): void
// }>()
const emit = defineEmits([
  'add-form-submit',
  'edit-form-submit',
  'view-form-submit',
  'add-form-cancel',
  'edit-form-cancel',
  'view-form-cancel',
  'fire-toolbar-event',
  'fire-add-form-event',
  'fire-edit-form-event',
  'fire-view-form-event',
  'search',
  'fire-remove',
  'fire-content-event',
  'fire-page-size-change',
  'fire-current-page-change'
])
const onFormSubmit = (form: object, type: string) => {
  let resolve: (v: any) => void

  const promise = new Promise((resolve_) => {
    resolve = resolve_
  })
  const event = `${type}-form-submit` as
    | 'add-form-submit'
    | 'edit-form-submit'
    | 'view-form-submit'
  emit(event, form, resolve)

  promise.then(() => {
    if (type === 'add') {
      addFormShow.value = false
    } else if (type === 'edit') {
      editFormShow.value = false
    } else {
      viewFormShow.value = false
    }
  })
}
const onFormCancel = (type: string) => {
  ///let emit = defineEmits([`${type}-form-submit`])
  const event = `${type}-form-cancel` as
    | 'add-form-cancel'
    | 'edit-form-cancel'
    | 'view-form-cancel'
  emit(event)
  if (type === 'add') {
    addFormShow.value = false
  } else if (type === 'edit') {
    editFormShow.value = false
  } else {
    viewFormShow.value = false
  }
}
const onFormFireEvent = (topic: string, form: object, type: string) => {
  const event = `fire-${type}-form-event` as
    | 'fire-add-form-event'
    | 'fire-edit-form-event'
    | 'fire-view-form-event'
  emit(event, topic, form)
}
// toolbar event
const onToolbarAdd = () => {
  addFormShow.value = true
  formData.value = {}
}
const onToolbarFireEvent = (topic) => {
  emit('fire-toolbar-event', topic)
}

const onSubmit = (query) => {
  emit('search', query)
}
// table event
const onContentEdit = (row) => {
  formData.value = cloneDeep(row)
  editFormShow.value = true
}
const onContentRemove = (row) => {
  emit('fire-remove', row)
}
const onContentView = (row) => {
  formData.value = cloneDeep(row)
  viewFormShow.value = true
}
const onContentfireEvent = (topic, row) => {
  emit('fire-content-event', topic, row)
}
const onSizeChange = (size) => {
  pageSize.value = size
  emit('fire-page-size-change', size)
}
const onCurrentChange = (page) => {
  currentPage.value = page
  emit('fire-current-page-change', page)
}
defineExpose({
  onToolbarAdd
})
</script>

<style lang="scss" scoped>
.crud-viewer {
  display: flex;
  flex-direction: column;

  .crud-content {
    flex: 1;
    height: 0;
  }

  .pagination-container.right {
    .pagination {
      float: right;
    }
  }

  .pagination {
    padding: 12px 0;
  }
}
</style>
