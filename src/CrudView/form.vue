<template>
  <div>
    <el-form v-bind="props.props" ref="cForm" :model="fd" class="crud-form">
      <el-row v-bind="row">
        <template v-for="(s, i) in base">
          <el-col v-if="isBlockVisible(s.key)" :key="i" v-bind="s.col">
            <el-form-item :label="s.label" :prop="s.key" v-bind="s.props">
              <slot name="form-item" :fd="fd" :attr="s.key">
                <slot :name="`form-${s.key}`" :fd="fd">
                  <template v-if="!s.component">
                    <el-input
                      v-if="
                        !s.type || s.type === 'text' || s.type === 'textarea'
                      "
                      v-bind="s.props"
                      v-model="fd[s.key]"
                      :disabled="isView"
                      :type="s.type || 'text'"
                    />
                    <el-input-number
                      v-else-if="s.type === 'number'"
                      v-model="fd[s.key]"
                      :disabled="isView"
                      v-bind="s.props"
                    />
                    <el-checkbox
                      v-else-if="s.type === 'checkbox'"
                      v-model="fd[s.key]"
                      v-bind="s.props"
                    />
                    <el-time-picker
                      v-else-if="s.type === 'time'"
                      v-model="fd[s.key]"
                      :disabled="isView"
                      v-bind="s.props"
                    />
                    <el-date-picker
                      v-else-if="s.type === 'datetime'"
                      v-model="fd[s.key]"
                      :disabled="isView"
                      v-bind="s.props"
                    />
                    <el-select
                      v-else-if="s.type === 'select'"
                      v-model="fd[s.key]"
                      :remote-method="_getRemoteMethod(s)"
                      :disabled="isView"
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
                    <el-radio-group
                      v-else-if="s.type === 'radio'"
                      v-model="fd[s.key]"
                      v-bind="s.props"
                    >
                      <template v-if="s.options">
                        <el-radio
                          v-for="o in s.options"
                          :key="o.value"
                          :disabled="o.disabled"
                          :label="o.value"
                          size="large"
                          >{{ o.label }}</el-radio
                        >
                      </template>
                    </el-radio-group>
                    <el-cascader
                      v-else-if="s.type === 'cascader'"
                      v-model="fd[s.key]"
                      :disabled="isView"
                      v-bind="s.props"
                    />
                  </template>
                  <component
                    :is="s.component"
                    v-else
                    v-model="fd[s.key]"
                    :disabled="isView"
                    v-bind="s.props"
                  />
                </slot>
              </slot>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      <el-collapse
        v-if="group && group.groups && group.groups.length"
        v-bind="group.props"
      >
        <template v-for="g in group.groups">
          <el-collapse-item
            v-if="isBlockVisible(g.groupKey)"
            :key="g.groupKey"
            :name="g.groupKey"
            :disabled="g.disabled"
          >
            <template #title>
              <slot :name="g.groupKey + '-group-title'" :group="g">
                <h3 class="group-title">
                  <i v-if="g.icon" class="header-icon" :class="g.icon" />
                  {{ g.title }}
                </h3>
              </slot>
            </template>
            <el-row v-bind="row">
              <template v-for="(s, index) in g.attrs">
                <el-col
                  v-if="isBlockVisible(s.key)"
                  :key="index"
                  v-bind="s.col"
                >
                  <el-form-item :label="s.label" :prop="s.key" v-bind="s.props">
                    <slot name="form-item" :fd="fd" :attr="s.key">
                      <slot :name="`form-${s.key}`" :fd="fd">
                        <template v-if="!s.component">
                          <el-input
                            v-if="
                              !s.type ||
                              s.type === 'text' ||
                              s.type === 'textarea'
                            "
                            v-model="fd[s.key]"
                            :disabled="isView"
                            v-bind="s.props"
                            :type="s.type || 'text'"
                          />
                          <el-checkbox
                            v-else-if="s.type === 'checkbox'"
                            v-model="fd[s.key]"
                            v-bind="s.props"
                          />
                          <el-input-number
                            v-else-if="s.type === 'number'"
                            v-model="fd[s.key]"
                            :disabled="isView"
                            v-bind="s.props"
                          />
                          <el-time-picker
                            v-else-if="s.type === 'time'"
                            v-model="fd[s.key]"
                            :disabled="isView"
                            v-bind="s.props"
                          />
                          <el-date-picker
                            v-else-if="s.type === 'datetime'"
                            v-model="fd[s.key]"
                            :disabled="isView"
                            v-bind="s.props"
                          />
                          <el-select
                            v-else-if="s.type === 'select'"
                            v-model="fd[s.key]"
                            :remote-method="_getRemoteMethod(s)"
                            :disabled="isView"
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
                            v-model="fd[s.key]"
                            :disabled="isView"
                            v-bind="s.props"
                          />
                        </template>
                        <component
                          :is="s.component"
                          v-else
                          v-model="fd[s.key]"
                          :disabled="isView"
                          v-bind="s.props"
                        />
                      </slot>
                    </slot>
                  </el-form-item>
                </el-col>
              </template>
            </el-row>
          </el-collapse-item>
        </template>
      </el-collapse>
    </el-form>
    <div :class="`action-${handle.align}`">
      <template v-for="(item, index) in buttons">
        <el-button
          v-if="item.show"
          :key="index"
          :disabled="item.disabled"
          :icon="item.icon"
          :text="item.text ? item.text : false"
          v-bind="item"
          @click="item.doClick(item, fd)"
          >{{ item.label }}</el-button
        >
      </template>
    </div>
  </div>
</template>

<script>
export default { name: 'CurdForm' }
</script>

<script setup>
import { cloneDeep } from 'lodash'
import { watch, computed, ref } from 'vue'
import {
  //ElNotification,
  ElSelect,
  ElOption,
  ElButton,
  ElInputNumber,
  ElInput,
  ElForm,
  ElFormItem,
  ElCollapse,
  ElCollapseItem,
  ElCol,
  ElRow,
  ElCheckbox,
  ElRadio,
  ElDatePicker,
  ElTimePicker,
  ElRadioGroup,
  ElCascader
} from 'element-plus'

const props = defineProps({
  formData: {
    type: Object,
    default() {
      return {}
    }
  },
  props: {
    type: Object,
    default() {
      return {}
    }
  },
  isView: {
    type: Boolean,
    default: false
  },
  row: {
    type: Object,
    default() {
      return null
    }
  },
  base: {
    type: Array,
    default() {
      return []
    }
  },
  group: {
    type: Object,
    default() {
      return null
    }
  },
  handle: {
    type: Object,
    default() {
      return null
    }
  },
  blocks: {
    type: Array,
    default() {
      return null
    }
  }
})
const fd = ref(props.formData)
const emit = defineEmits(['fireEvent', 'cancel', 'submit'])
const cForm = ref()
const fireEvent = (topic, form) => {
  console.log(topic, form)
  if (topic && typeof topic === 'string') {
    emit('fireEvent', topic, form)
  }
}
const handleFormCancel = () => {
  emit('cancel')
}
const handleFormSubmit = () => {
  const sForm = cForm.value
  if (!sForm) return
  sForm.validate((valid) => {
    if (valid) {
      emit('submit', cloneDeep(fd.value))
    } else {
      // ElNotification.error({
      //   title: '错误',
      //   message: '表单校验失败'
      // })
      return false
    }
  })
}
const buttons = computed(() => {
  if (!props.handle) return []
  const btns = []
  if (props.handle.cancelButton) {
    const cancelButton = props.handle.cancelButton
    if (cancelButton.doClick) {
      // if (typeof cancelButton.doClick === 'function') {
      //   let fn = cancelButton.doClick
      //   cancelButton.doClick = function(btn, form) {
      //     this.fireEvent(btn.topic, form)
      //     fn(this, form)
      //   }
      // } else {
      delete cancelButton.doClick
      // }
    }
    btns.push({
      show: true,
      type: 'primary',
      disabled: false,
      doClick: (btn, form) => {
        fireEvent(btn.topic, form)
        handleFormCancel()
      },
      topic: 'cancel',
      order: 0,
      label: '取消',
      ...props.handle.cancelButton
    })
  }
  if (props.handle.confirmButton) {
    const confirmButton = props.handle.confirmButton
    if (confirmButton.doClick) {
      // if (typeof confirmButton.doClick === 'function') {
      //   let fn = confirmButton.doClick
      //   confirmButton.doClick = function(btn, form) {
      //     this.fireEvent(btn.topic, form)
      //     fn(this, form)
      //   }
      // } else {
      delete confirmButton.doClick
      // }
    }
    btns.push({
      type: 'primary',
      show: true,
      disabled: false,
      doClick: (btn, form) => {
        fireEvent(btn.topic, form)
        handleFormSubmit()
      },
      order: 0,
      topic: 'confirm',
      icon: 'el-icon-search',
      label: '确认',
      ...props.handle.confirmButton
    })
  }
  const custom = props.handle.buttons || []
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
  () => props.formData,
  (n) => {
    cForm.value.resetFields()
    fd.value = n
  }
)

const isBlockVisible = (key) => {
  if (!props.blocks || !props.blocks.length) {
    return true
  } else {
    for (let i = 0; i < props.blocks.length; i++) {
      const block = props.blocks[i]
      if (block.items && block.items.length) {
        if (block.items.indexOf(key) !== -1) {
          if (block.visible && typeof block.visible === 'object') {
            const attrs = block.visible.attrs
            const relationship = block.visible.relationship
            if (attrs && relationship) {
              const indexs = []
              const rets = attrs.map((a, i) => {
                indexs.push('a' + i)
                return fd.value[a.key] === a.value
              })
              const str = 'return ' + relationship
              const func = new Function(...indexs, str)
              return func(...rets)
            }
          }
        }
      }
    }
  }
  return true
}
const _getRemoteMethod = (s) => {
  if (s.props && s.props.remoteMethod) {
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

<style lang="scss">
.crud-form {
  .group-title {
    font-size: 14px;
    color: #409eff;
  }

  .header-icon {
    font-size: 12px;
    color: #409eff;
  }
}

.action-right {
  text-align: right;
}

.action-center {
  text-align: center;
}
</style>
