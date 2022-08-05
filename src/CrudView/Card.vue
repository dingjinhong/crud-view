<template>
  <el-card class="crud-view-card" :body-style="{ padding: '0px' }">
    <div class="card-content">
      <div class="title-line">
        <slot name="title" :title-data="titleData">
          <img :src="getTitleValue(titleData.img)" />
          <div class="text-container">
            <div class="title">
              <el-tooltip placement="top">
                <template #content>
                  <div>{{ getTitleValue(titleData.title) }}</div>
                </template>
                <span>{{ getTitleValue(titleData.title) }}</span>
              </el-tooltip>
            </div>
            <div class="desc">
              <el-tooltip placement="top">
                <template #content>
                  <div>{{ getTitleValue(titleData.desc) }}</div>
                </template>
                <span class="desc">{{ getTitleValue(titleData.desc) }}</span>
              </el-tooltip>
            </div>
          </div>
        </slot>
      </div>
      <div class="attr-container">
        <div
          v-for="(col, i) in columns"
          :key="col.key"
          class="attr-item"
          :style="getColumnStyle()"
        >
          <div class="header">{{ col.label }}</div>
          <slot
            :name="`col-${col.key}`"
            :index="i"
            :cell-value="getColumnValue(col)"
            :attr-key="col.key"
            :item-data="data"
          >
            <component
              :is="col.component"
              v-if="col.component"
              :attr-key="col.key"
              :index="i"
              :value="getColumnValue(col)"
              :item-data="data"
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
    <div v-if="actionOptions.show" class="card-action">
      <div
        v-for="(item, i) in buttons"
        :key="i"
        :style="getActionStyle()"
        class="action"
      >
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
      <div
        v-if="dropdownList && dropdownList.length"
        :style="getActionStyle()"
        class="action"
      >
        <el-dropdown
          class="row-handle-dropdown"
          trigger="hover"
          v-bind="
            actionOptions.dropdown ? actionOptions.dropdown.props || {} : {}
          "
          @command="handleCommand($event, data)"
        >
          <el-button
            v-bind="
              actionOptions.dropdown ? actionOptions.dropdown.button || {} : {}
            "
          >
            {{
              actionOptions.dropdown
                ? actionOptions.dropdown.text || '更多'
                : '更多'
            }}<el-icon
              v-if="actionOptions.dropdown.showArrow"
              class="el-icon--right"
              ><arrow-down
            /></el-icon>
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
  </el-card>
</template>

<script setup>
import { cardActionProps, ActionMixins, actionEmits } from './mixins/action'

const props = defineProps(cardActionProps)
const emit = defineEmits(actionEmits)
const { getTitleValue, getColumnValue, handleCommand, dropdownList, buttons } =
  ActionMixins(props.actionOptions, props.data, emit)

const getColumnStyle = () => {
  const splitNum = this.columnOptions.splitNum || 3
  let padding = this.columnOptions.padding || 8
  const width = 100 / splitNum + '%'
  padding = padding + 'px'
  return {
    width,
    padding
  }
}

const getActionStyle = () => {
  const splitNum = this.dropdownList.length
    ? this.buttons.length + 1
    : this.buttons.length
  let margin = this.actionOptions.hMargin || 12
  const width = 100 / splitNum + '%'
  margin = margin + 'px'

  return {
    width,
    marginTop: margin,
    marginBottom: margin,
    textAlign: 'center'
  }
}
</script>

<style lang="scss">
.crud-view-card {
  .card-content {
    padding: 24px;

    .title-line {
      display: flex;

      img {
        margin-right: 16px;
        display: block;
        width: 40px;
        height: 40px;
        object-fit: cover;
      }

      .text-container {
        flex: 1;
        overflow: hidden;

        .title {
          overflow: hidden;
          color: rgba(0, 0, 0, 0.85);
          font-size: 16px;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-weight: 600;
          width: 95%;
          line-height: 24px;
        }

        .desc {
          overflow: hidden;
          color: rgba(0, 0, 0, 0.45);
          font-weight: 500;
          font-size: 14px;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 95%;
          line-height: 21px;
        }
      }
    }

    .attr-container {
      margin-top: 16px;
      overflow-x: auto;
      display: flex;

      .attr-item {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .header {
        margin-bottom: 4px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 12px;
        line-height: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .text {
        font-size: 12px;
        font-weight: 600;
        line-height: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  .card-action {
    display: flex;

    .action + .action {
      border-left: 1px solid #e8e8e8;
    }

    .row-handle-dropdown {
      margin-left: 10px;

      .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
      }

      // .el-icon-arrow-down {
      //   font-size: 12px;
      // }
    }
  }
}
</style>
