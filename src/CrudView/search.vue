<template>
  <div class="crud-search">
    <slot name="search-before" />
    <el-form
      v-if="options && options.show"
      ref="searchForm"
      class="search-form"
      :inline="true"
      :model="form"
      v-bind="options.props"
      @submit.prevent
    >
      <div class="form-line">
        <slot name="search-show-before" :form="form" />
        <el-form-item v-for="s in showList" :key="s.key" :label="s.label">
          <slot :name="`search-show-${s.key}`" :form="form" :item="s">
            <template v-if="!s.component">
              <TextSearch
                v-if="
                  !s.type ||
                  s.type === 'text' ||
                  s.type === 'textarea' ||
                  s.type === 'search'
                "
                v-model="form[s.key]"
                v-bind="s.props"
                :type="s.type || 'text'"
              />
              <el-checkbox
                v-else-if="s.type === 'checkbox'"
                v-model="form[s.key]"
                v-bind="s.props"
              />
              <el-input-number
                v-else-if="s.type === 'number'"
                v-model="form[s.key]"
                v-bind="s.props"
              />
              <el-time-picker
                v-else-if="s.type === 'time'"
                v-model="form[s.key]"
                v-bind="s.props"
              />
              <el-date-picker
                v-else-if="s.type === 'datetime'"
                v-model="form[s.key]"
                v-bind="s.props"
              />
              <el-select
                v-else-if="s.type === 'select'"
                v-model="form[s.key]"
                :remote-method="_getRemoteMethod(s)"
                v-bind="s.props"
              >
                <template v-if="s.options">
                  <el-option
                    v-for="o in s.options"
                    :key="o.value"
                    :value="o.value"
                    :label="o.label"
                  />
                </template>
              </el-select>
              <el-cascader
                v-else-if="s.type === 'cascader'"
                v-model="form[s.key]"
                v-bind="s.props"
              />
            </template>
            <component
              :is="s.component"
              v-else
              v-model="form[s.key]"
              v-bind="s.props"
            />
            <slot name="search-show-after" :form="form" />
          </slot>
        </el-form-item>
        <el-form-item v-if="hideList && hideList.length">
          <div
            v-if="hideList && hideList.length > 0"
            class="handle-expand"
            @click="expand = !expand"
          >
            <span class="label">{{ options.expandText }}</span>
            <i :class="['icon el-icon-arrow-up', expand ? '' : 'is-reverse']" />
          </div>
        </el-form-item>
        <el-form-item>
          <template v-for="(item, index) in buttons">
            <el-button
              v-if="item.show"
              :key="index"
              :type="item.type"
              :disabled="item.disabled"
              :text="item.text ? item.text : false"
              :icon="item.icon"
              v-bind="item.props"
              @click="item.doClick(item, form)"
              >{{ item.label }}</el-button
            >
          </template>
        </el-form-item>
        <slot name="search-show-action-after" :form="form" />
      </div>
      <el-collapse-transition>
        <div v-if="expand" class="form-line">
          <slot name="search-hide-before" :form="form" />
          <el-form-item v-for="s in hideList" :key="s.key" :label="s.label">
            <slot :name="`search-hide-${s.key}`" :form="form" :item="s">
              <template v-if="!s.component">
                <TextSearch
                  v-if="
                    !s.type ||
                    s.type === 'text' ||
                    s.type === 'textarea' ||
                    s.type === 'search'
                  "
                  v-model="form[s.key]"
                  v-bind="s.props"
                  :type="s.type || 'text'"
                />
                <el-checkbox
                  v-else-if="s.type === 'checkbox'"
                  v-model="form[s.key]"
                  v-bind="s.props"
                />
                <el-input-number
                  v-else-if="s.type === 'number'"
                  v-model="form[s.key]"
                  v-bind="s.props"
                />
                <el-time-picker
                  v-else-if="s.type === 'time'"
                  v-model="form[s.key]"
                  v-bind="s.props"
                />
                <el-date-picker
                  v-else-if="s.type === 'datetime'"
                  v-model="form[s.key]"
                  v-bind="s.props"
                />
                <el-select
                  v-else-if="s.type === 'select'"
                  v-model="form[s.key]"
                  :remote-method="_getRemoteMethod(s)"
                  v-bind="s.props"
                >
                  <template v-if="s.options">
                    <el-option
                      v-for="o in s.options"
                      :key="o.value"
                      :value="o.value"
                      :label="o.label"
                    />
                  </template>
                </el-select>
                <el-cascader
                  v-else-if="s.type === 'cascader'"
                  v-model="form[s.key]"
                  v-bind="s.props"
                />
              </template>
              <component
                :is="s.component"
                v-else
                v-model="form[s.key]"
                v-bind="s.props"
              />
            </slot>
          </el-form-item>
          <slot name="search-hide-after" :form="form" />
        </div>
      </el-collapse-transition>
    </el-form>
    <slot name="search-after" />
  </div>
</template>

<script>
export default {
  name: 'CrudSearch'
}
</script>
<script setup>
import TextSearch from './textSearch.vue'
import { cloneDeep } from 'lodash'
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import {
  ElNotification,
  ElSelect,
  ElOption,
  ElButton,
  ElInputNumber,
  ElCheckbox,
  ElDatePicker,
  ElForm,
  ElFormItem,
  ElCollapseTransition,
  ElCascader,
  ElTimePicker
} from 'element-plus'

const props = defineProps({
  options: {
    type: Object,
    default() {
      return {
        show: true,
        expandText: '展开',
        resetButton: {
          label: '重置',
          disabled: false,
          show: true,
          icon: '',
          order: 0
        },
        submitButton: {
          label: '查询',
          disabled: false,
          show: true,
          icon: '',
          order: 1
        },
        searchWhenChange: true,
        buttons: []
      }
    }
  },
  showList: {
    type: Array,
    default() {
      return []
    }
  },
  hideList: {
    type: Array,
    default() {
      return []
    }
  }
})
const emit = defineEmits(['submit', 'fireEvent'])
const _setDefaultValue = (list, form) => {
  list.forEach((l) => {
    if (l.default) {
      form[l.key] = l.default
    }
  })
}
const fireEvent = (topic, form) => {
  console.log(topic, form)
  if (topic && typeof topic === 'string') {
    emit('fireEvent', topic, form)
  }
}
const handleFormSubmit = () => {
  const sForm = searchForm.value
  if (!sForm) return
  sForm.validate((valid) => {
    if (valid) {
      emit('submit', cloneDeep(form.value))
    } else {
      ElNotification.error({
        title: '错误',
        message: '表单校验失败'
      })
      return false
    }
  })
}
const form = ref({})
_setDefaultValue(props.showList, form.value)
_setDefaultValue(props.hideList, form.value)

const expand = ref(false)
let unwatch = null
const searchForm = ref()

const searchWhenChange = computed(() => {
  return props.options.searchWhenChange
})
const buttons = computed(() => {
  if (!props.options) return []
  const btns = []
  if (props.options.resetButton) {
    const resetButton = props.options.resetButton
    if (resetButton.doClick) {
      // if (typeof resetButton.doClick === 'function') {
      //   let fn = resetButton.doClick
      //   resetButton.doClick = function(btn, form) {
      //     this.fireEvent(btn.topic, form)
      //     fn(this, form)
      //   }
      // } else {
      delete resetButton.doClick
      // }
    }
  }
  btns.push({
    show: true,
    type: 'primary',
    disabled: false,
    doClick: (btn, form) => {
      fireEvent(btn.topic, form)
      handleFormSubmit()
    },
    order: 0,
    topic: 'reset',
    icon: 'el-icon-search',
    text: '重置',
    ...(props.options.resetButton ? props.options.resetButton : {})
  })
  if (props.options.submitButton) {
    const submitButton = props.options.submitButton
    if (submitButton.doClick) {
      // if (typeof submitButton.doClick === 'function') {
      //   let fn = submitButton.doClick
      //   submitButton.doClick = function(btn, form) {
      //     this.fireEvent(btn.topic, form)
      //     fn(this, form)
      //   }
      // } else {
      delete submitButton.doClick
      // }
    }
  }
  btns.push({
    type: 'primary',
    disabled: false,
    doClick: (btn, form) => {
      fireEvent(btn.topic, form)
      handleFormSubmit()
    },
    order: 0,
    topic: 'submit',
    icon: 'el-icon-search',
    text: '查询',
    ...(props.options.submitButton ? props.options.submitButton : {}),
    show: !props.options.searchWhenChange
  })
  const custom = props.options.buttons || []
  custom.forEach((c) => {
    if (c.doClick) {
      if (typeof c.doClick === 'function') {
        const fn = c.doClick
        c.doClick = function (btn, form) {
          fireEvent(btn.topic, form)
          fn(form)
        }
      } else {
        delete c.doClick
      }
    }
  })
  btns.splice(btns.length, 0, ...custom)
  btns.sort((a, b) => {
    return a.order - b.order
  })
  return btns
})

watch(
  () => props.showList,
  (n) => {
    _setDefaultValue(n, form.value)
  }
)
watch(
  () => props.hideList,
  (n) => {
    _setDefaultValue(n, form.value)
  }
)
watch(searchWhenChange, (n) => {
  if (n) {
    unwatch = watch(
      form,
      () => {
        handleFormSubmit()
      },
      { deep: true }
    )
  } else {
    if (unwatch) {
      unwatch()
      unwatch = null
    }
  }
})

onMounted(() => {
  if (searchWhenChange.value) {
    unwatch = watch(
      form,
      () => {
        handleFormSubmit()
      },
      { deep: true, immediate: true }
    )
  } else {
    handleFormSubmit()
  }
})
onBeforeUnmount(() => {
  if (unwatch) {
    unwatch()
  }
})
const _getRemoteMethod = (s) => {
  if (s.props.remoteMethod) {
    return ((ss, remoteMethod) => {
      return async (query) => {
        try {
          const options = await remoteMethod(query)
          ss.options = options
        } catch (e) {
          console.error(e)
        }
      }
    })(s, s.props.remoteMethod)
  }
  return undefined
}
</script>

<style lang="scss" scoped>
.crud-search {
  display: flex;
  flex-wrap: wrap;

  .search-form {
    flex: 1;
    padding: 16px 0;

    .form-line {
      .handle-expand {
        cursor: pointer;
        color: #6296ff;

        .le-icon-arrow-up {
          transition: all 0.3s;
        }

        .is-reverse {
          transform: rotate(180deg);
        }
      }

      :deep(.el-form-item) {
        margin-bottom: 0;

        .el-form-item__label {
          padding-right: 8px;
        }
      }
    }

    .form-line + .form-line {
      margin-top: 16px;
    }
  }
}
</style>
