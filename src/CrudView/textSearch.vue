<template>
  <div class="text-search">
    <el-input
      v-if="type !== 'search'"
      v-model.trim="value"
      v-bind="attrs"
      :type="type"
      @change="onChange"
      @keyup.enter="onChange(value)"
    ></el-input>
    <el-input
      v-else
      v-model.tirm="value"
      v-bind="searchAttrs"
      :maxlength="200"
      type="text"
      @keyup.enter="onChange(value)"
    >
      <template #suffix>
        <el-icon v-if="value" @click="handleClear">
          <circle-close-filled />
        </el-icon>
        <el-icon @click="handleSearch()">
          <search />
        </el-icon>
      </template>
    </el-input>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<script lang="ts" setup>
import { ElInput, ElIcon } from 'element-plus'
import { CircleCloseFilled, Search } from '@element-plus/icons'
import { ref, useAttrs, watch } from 'vue'

const attrs = useAttrs()
const { suffixIcon, afterIcon, clearable, ...searchAttrs } = attrs
const props = defineProps({
  modelValue: {
    type: String,
    default() {
      return ''
    }
  },
  type: {
    type: String,
    default: 'text'
  }
})
const emit = defineEmits(['update:modelValue'])
const value = ref(props.modelValue)
watch(
  () => props.modelValue,
  (n) => {
    value.value = n
  }
)
const handleClear = () => {
  value.value = ''
  emit('update:modelValue', value.value)
}
const handleSearch = () => {
  emit('update:modelValue', value.value)
}
const onChange = (val: string) => {
  emit('update:modelValue', val)
}
</script>

<style lang="scss" scoped>
.text-search {
  :deep(.el-input__suffix) {
    .el-input__suffix-inner {
      i {
        margin: 0 3px;
      }

      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
