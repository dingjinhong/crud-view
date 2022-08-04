import { computed } from 'vue'

export const cardActionProps = {
  data: {
    type: Object,
    default() {
      return null
    }
  },
  columns: {
    type: Array,
    default() {
      return []
    }
  },
  columnOptions: {
    type: Object,
    default() {
      return {
        splitNum: 3,
        padding: 8
      }
    }
  },
  actionOptions: {
    type: Object,
    default() {
      return {
        show: true,
        hMargin: 12,
        atLeast: 2, // 多于多少个出现dropdown，
        dropdown: {
          text: '...'
        }
      }
    }
  },
  titleData: {
    type: Object,
    default() {
      return {}
    }
  }
}
export const ActionMixins = function (actionOptions, data, emitFn) {
  const fireEvent = (topic, row) => {
    console.log(topic, row)
    if (topic && typeof topic === 'string') {
      emitFn('fireEvent', topic, row)
    }
  }
  const handleList = computed(() => {
    if (!actionOptions) return []
    let btns = []
    let viewButton = {}
    if (actionOptions && actionOptions.buttons && actionOptions.buttons.view) {
      viewButton = actionOptions.buttons.view
      if (viewButton.doClick) {
        delete viewButton.doClick
      }
    }
    btns.push({
      show: true,
      text: true,
      type: 'primary',
      disabled: false,
      doClick: (btn, row) => {
        fireEvent(btn.topic, row)
        emitFn('view', row)
      },
      topic: 'view-form',
      order: 0,
      icon: 'view',
      label: '查看',
      ...viewButton
    })
    let editButton = {}
    if (actionOptions && actionOptions.buttons && actionOptions.buttons.edit) {
      editButton = actionOptions.buttons.edit
      if (editButton.doClick) {
        delete editButton.doClick
      }
    }
    btns.push({
      show: true,
      text: true,
      type: 'primary',
      disabled: false,
      doClick: (btn, row) => {
        fireEvent(btn.topic, row)
        emitFn('edit', row)
      },
      order: 1,
      topic: 'eidt-form',
      icon: 'edit',
      label: '编辑',
      ...editButton
    })
    let removeButton = {}
    if (
      actionOptions &&
      actionOptions.buttons &&
      actionOptions.buttons.remove
    ) {
      removeButton = actionOptions.buttons.remove
      if (removeButton.doClick) {
        delete removeButton.doClick
      }
    }
    btns.push({
      show: true,
      text: true,
      type: 'primary',
      disabled: false,
      doClick: (btn, row) => {
        fireEvent(btn.topic, row)
        emitFn('remove', row)
      },
      order: 2,
      topic: 'remove-form',
      icon: 'remove',
      label: '删除',
      ...removeButton
    })
    if (actionOptions && actionOptions.buttons) {
      const custom = actionOptions.buttons.custom || []
      custom.forEach((c) => {
        if (c.doClick) {
          if (typeof c.doClick === 'function') {
            const fn = c.doClick
            c.doClick = function (btn, row) {
              fireEvent(btn.topic, row)
              fn(row)
            }
          } else {
            delete c.doClick
          }
        }
      })
      btns.splice(btns.length, 0, ...custom)
    }
    btns = btns.filter((f) => f.show)
    btns.sort((a, b) => {
      return a.order - b.order
    })
    return btns
  })
  const atLeast = computed(() => {
    if (!actionOptions) return undefined
    const atLeast = actionOptions.atLeast
    if (typeof atLeast === 'number') {
      return atLeast
    } else {
      return undefined
    }
  })
  const buttons = computed(() => {
    return handleList.value.slice(0, atLeast.value)
  })
  const dropdownList = computed(() => {
    return handleList.value.slice(buttons.value.length, handleList.value.length)
  })

  const handleCommand = (btn, row) => {
    if (btn.doClick && typeof btn.doClick === 'function') {
      btn.doClick(btn, row)
    } else {
      if (btn.topic) {
        fireEvent(btn.topic, row)
      }
    }
  }

  const getColumnValue = (col) => {
    let value = data[col.key]
    if (col.formatter && typeof col.formatter === 'function') {
      value = col.formatter(value)
    }
    return value
  }
  const getTitleValue = (d) => {
    if (d) {
      if (typeof d === 'object') {
        let value = data[d.key]
        if (d.formatter && typeof d.formatter === 'function') {
          value = d.formatter(value)
        }
        return value
      } else {
        return d.toString()
      }
    } else {
      return ''
    }
  }
  return {
    getTitleValue,
    getColumnValue,
    handleCommand,
    handleList,
    atLeast,
    dropdownList,
    buttons
  }
}
export const actionEmits = ['remove', 'edit', 'fireEvent', 'view']
