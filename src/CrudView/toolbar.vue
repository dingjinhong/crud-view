<template>
  <div class="crud-toolbar">
    <slot name="toolbar-before" />
    <div class="toolbar-content">
      <div class="left">
        <slot name="toolbar-content-left">
          <template v-for="(item, index) in leftBtns">
            <el-button
              v-if="item.show"
              :key="index"
              :disabled="item.disabled"
              :icon="item.icon"
              v-bind="item"
              @click="item.doClick(item)"
              >{{ item.text }}</el-button
            >
          </template>
        </slot>
      </div>
      <div class="right">
        <slot name="toolbar-content-right">
          <template v-for="(item, index) in rightBtns">
            <el-button
              v-if="item.show"
              :key="index"
              :disabled="item.disabled"
              :text="item.text ? item.text : false"
              :icon="item.icon"
              v-bind="item"
              @click="item.doClick(item)"
              >{{ item.label }}</el-button
            >
          </template>
        </slot>
      </div>
    </div>
    <slot name="toolbar-after" />
  </div>
</template>

<script>
export default { name: 'CurdToolbar' }
</script>
<script setup>
import { computed } from 'vue'
import { ElButton } from 'element-plus'
const props = defineProps({
  leftHandle: {
    type: Object,
    default() {
      return null
    }
  },
  rightHandle: {
    type: Object,
    default() {
      return null
    }
  }
})
const emit = defineEmits(['fireEvent', 'add'])
const fireEvent = (topic) => {
  console.log(topic)
  if (topic && typeof topic === 'string') {
    emit('fireEvent', topic)
  }
}
const leftBtns = computed(() => {
  if (!props.leftHandle) return []
  const btns = []
  if (props.leftHandle.addButton) {
    const addButton = props.leftHandle.addButton
    if (addButton.doClick) {
      //   if (typeof addButton.doClick === 'function') {
      //     let fn = addButton.doClick
      //     addButton.doClick = function(btn) {
      //       this.fireEvent(btn.topic)
      //       fn(this)
      //     }
      //   } else {
      delete addButton.doClick
      //   }
    }
    btns.push({
      show: true,
      type: 'primary',
      disabled: false,
      doClick: (btn, form) => {
        fireEvent(btn.topic, form)
        emit('add')
      },
      topic: 'add',
      order: 0,
      label: '添加',
      ...props.leftHandle.addButton
    })
  }
  const custom = props.leftHandle.custom || []
  custom.forEach((c) => {
    if (c.doClick) {
      if (typeof c.doClick === 'function') {
        const fn = c.doClick
        c.doClick = function (btn) {
          fireEvent(btn.topic)
          fn()
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
const rightBtns = computed(() => {
  if (!props.rightHandle) return []
  const btns = []
  const custom = props.rightHandle.custom || []
  custom.forEach((c) => {
    if (c.doClick) {
      if (typeof c.doClick === 'function') {
        const fn = c.doClick
        c.doClick = function (btn) {
          fireEvent(btn.topic)
          fn()
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
</script>

<style lang="scss">
.crud-toolbar {
  display: flex;
  padding: 16px 0;

  .toolbar-content {
    display: flex;
    flex: 1;
    width: 0;

    .left {
      flex: 1;
      width: 0;
      display: flex;
      flex-wrap: wrap;
    }

    .right {
      display: flex;
    }
  }
}
</style>
