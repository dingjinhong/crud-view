<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import CrudView from './CrudView/index.vue'
//import CrudView from '../dist/crud-view.es'
import config from './config'
const data = [
  {
    name: 'name1',
    code: 'code1',
    description: 'description1',
    sort: 'sort1',
    updateUserName: 'updateUserName1',
    updateDate: 'updateDate1'
  }
]
</script>

<template>
  <CrudView :data="data" :total="1" :config="config" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
