<template>
  <el-card class="action-card">
    <template #header>
      <div class="header">
        <div class="title">
          <img class="icon" :src="getTitleValue(titleData.img)" />
          <div class="label">{{ getTitleValue(titleData.title) }}</div>
        </div>
        <div class="action-line">
          <div v-for="(item, i) in buttons" :key="i" class="action">
            <el-button
              :disabled="item.disabled"
              :type="item.type"
              :icon="item.icon"
              :text="item.text ? item.text : false"
              v-bind="item.props"
              @click="item.doClick(item, data)"
              >{{ item.label }}</el-button
            >
          </div>
          <div v-if="dropdownList && dropdownList.length" class="action">
            <el-dropdown
              class="row-handle-dropdown"
              trigger="hover"
              v-bind="
                actionOptions.dropdown ? actionOptions.dropdown.props || {} : {}
              "
              @command="handleCommand($event, data)"
            >
              <el-button
                type="text"
                v-bind="
                  actionOptions.dropdown
                    ? actionOptions.dropdown.button || {}
                    : {}
                "
              >
                {{
                  actionOptions.dropdown
                    ? actionOptions.dropdown.text || '更多'
                    : '更多'
                }}<i
                  v-if="actionOptions.dropdown.showArrow"
                  class="el-icon-arrow-down el-icon--right"
                />
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
          </div>
        </div>
      </div>
    </template>
    <div class="body">
      <div v-for="(col, i) in columns" :key="i" class="line">
        <div class="label">{{ col.label }}:</div>
        <div class="content">
          <slot :name="`col-${col.key}`" :cell-value="getColumnValue(col)">
            <component
              :is="col.component"
              v-if="col.component"
              :index="i"
              :value="getColumnValue(col)"
            />
            <div v-else class="text">
              <el-tooltip placement="top">
                <template #content>
                  <div>{{ getColumnValue(col) }}</div>
                </template>
                <span>{{ getColumnValue(col) }}</span>
              </el-tooltip>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { cardActionProps, ActionMixins, actionEmits } from './mixins/action'

const props = defineProps(cardActionProps)
const emit = defineEmits(actionEmits)
const { getTitleValue, getColumnValue, handleCommand, dropdownList, buttons } =
  ActionMixins(props.actionOptions, props.data, emit)
</script>

<style lang="scss" scoped>
.action-card {
  margin-bottom: 24px;

  ::v-deep .el-card__header {
    padding-top: 8px;
    padding-bottom: 8px;
  }
}

.header {
  display: flex;
  align-items: center;

  .title {
    display: flex;
    align-items: center;
    flex: 1;
    width: 0;

    .icon {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }

    .label {
      font-size: 16px;
      line-height: 1.25px;
    }
  }

  .action-line {
    display: flex;
    align-items: center;

    .action + .action {
      margin-left: 8px;
    }

    .row-handle-dropdown {
      margin-left: 10px;

      .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
      }

      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
  }
}

.body {
  height: 128px;
  overflow-y: auto;

  .line {
    display: flex;
    align-items: center;
    min-height: 32px;

    .label {
      font-size: 14px;
    }

    .content {
      flex: 1;
      width: 0;
      padding-left: 16px;

      .text {
        font-size: 16px;
      }
    }
  }
}
</style>
