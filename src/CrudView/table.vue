<template>
  <div class="crud-table-container" @sort-change="onSortChange">
    <el-table
      v-if="options && options.show"
      ref="table"
      class="crud-table"
      :data="tableData"
      v-bind="options.props"
    >
      <slot name="table-content" :options="options">
        <slot v-if="options.multiple" name="multiple-column" :options="options">
          <el-table-column type="selection" width="55" />
        </slot>
        <template v-for="col in columns" :key="col.key">
          <el-table-column
            :formatter="null"
            :label="col.label"
            :prop="col.key"
            v-bind="col.props"
          >
            <template #default="scope">
              <slot
                :name="`col-${col.key}`"
                :attr-key="col.key"
                :index="scope.$index"
                :cell-value="getColumnValue(col, scope)"
                :item-data="scope.row"
              >
                <component
                  :is="col.component"
                  v-if="col.component"
                  :index="scope.$index"
                  :attr-key="col.key"
                  :value="getColumnValue(col, scope)"
                  :item-data="scope.row"
                />
                <div
                  v-else
                  :class="
                    col.props && col.props.showOverflowTooltip
                      ? 'ellipsis-one'
                      : ''
                  "
                >
                  {{ getColumnValue(col, scope) }}
                </div>
              </slot>
            </template>
          </el-table-column>
        </template>
        <slot
          v-if="options.rowHandle && options.rowHandle.show"
          name="multiple-column"
          :options="options"
        >
          <el-table-column
            :label="options.rowHandle.label"
            v-bind="options.rowHandle.props"
          >
            <template #default="scope">
              <template v-if="buttons && buttons.length">
                <el-button
                  v-for="(item, index) in buttons"
                  :key="index"
                  :type="item.type"
                  :disabled="item.disabled"
                  :text="item.text ? item.text : false"
                  :icon="item.icon"
                  v-bind="item.props"
                  @click="item.doClick(item, scope.row)"
                  >{{ item.label }}</el-button
                >
              </template>
              <template v-if="dropdownList && dropdownList.length">
                <el-dropdown
                  class="row-handle-dropdown"
                  trigger="hover"
                  v-bind="
                    options.rowHandle.dropdown
                      ? options.rowHandle.dropdown.props || {}
                      : {}
                  "
                  @command="handleCommand($event, scope.row)"
                >
                  <el-button
                    v-bind="
                      options.rowHandle.dropdown
                        ? options.rowHandle.dropdown.button || {}
                        : {}
                    "
                  >
                    {{
                      options.rowHandle.dropdown
                        ? options.rowHandle.dropdown.text || '更多'
                        : '更多'
                    }}
                    <el-icon
                      v-if="options.rowHandle.dropdown.showArrow"
                      class="el-icon--right"
                    >
                      <arrow-down />
                    </el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item
                        v-for="(d, i) in dropdownList"
                        :key="i"
                        v-bind="d"
                        :command="d"
                        >{{ d.text }}</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
            </template>
          </el-table-column>
        </slot>
      </slot>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'CurdTable'
}
</script>
<script setup>
import { ActionMixins, actionEmits } from './mixins/action'
import {
  ElTable,
  ElTableColumn,
  ElButton,
  ElIcon,
  ElDropdownItem,
  ElDropdownMenu,
  ElDropdown
} from 'element-plus'
import { ArrowDown } from '@element-plus/icons'
const props = defineProps({
  options: {
    type: Object,
    default() {
      return { show: true, props: { height: '100%' }, multiple: false }
    }
  },
  columns: {
    type: Array,
    default() {
      return []
    }
  },
  tableData: {
    type: Array,
    default() {
      return []
    }
  }
})

const emit = defineEmits(actionEmits)
const getColumnValue = (col, scope) => {
  let value = scope.row[col.key]
  if (col.formatter && typeof col.formatter === 'function') {
    value = col.formatter(scope.row, scope.column, value, scope.$index)
  }
  return value
}
const { handleCommand, dropdownList, buttons } = ActionMixins(
  props.options.rowHandle,
  props.tableData,
  emit
)

const onSortChange = ({ column, prop, order }) => {
  // let col = this.columns.find(c => {
  //   return c.key === prop
  // })
  // if(col)
  const emit = defineEmits(['sort-change'])
  emit('sort-change', { column, prop, order })
}
</script>

<style lang="scss" scoped>
.crud-table-container {
  height: 100%;
  width: 100%;

  .crud-table {
    width: 100%;

    .row-handle-dropdown {
      margin-left: 10px;

      // .el-dropdown-link {
      //   cursor: pointer;
      //   color: #409eff;
      // }

      // .el-icon-arrow-down {
      //   font-size: 12px;
      // }
    }
  }
}

.ellipsis-one {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
