<template>
  <el-row v-bind="cardViewOptions.rowProps" class="crud-card-view">
    <el-col v-for="(d, i) in data" :key="i" v-bind="cardViewOptions.colProps">
      <slot name="card" :columns="columns" :title-data="titleData" :data="d">
        <Card
          class="card"
          :columns="columns"
          :title-data="titleData"
          :data="d"
          v-bind="{
            ...(cardViewOptions.cardOptions ? cardViewOptions.cardOptions : {})
          }"
        >
          <template #title="{ titleData: td }">
            <slot name="title" :title-data="td" />
          </template>
          <template v-for="col in columns" #[`col-${col.key}`]="{ cellValue }">
            <slot :name="`col-${col.key}`" v-bind="{ cellValue }" />
            <!-- <el-table-column slot="multiple-column"><template slot-scope="scope">{{ scope.row }}</template></el-table-column> -->
          </template>
        </Card>
      </slot>
    </el-col>
  </el-row>
</template>

<script>
import Card from './Card.vue'

export default {
  name: 'CardView',
  components: {
    Card
  },
  props: {
    cardViewOptions: {
      type: Object,
      default() {
        return null
      }
    },
    titleData: {
      type: Object,
      default() {
        return {}
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
.crud-card-view {
  overflow-y: auto;

  .card {
    margin-bottom: 20px;
  }
}
</style>
