<template>
  <el-select
    style="width: 100%;"
    v-model="props.cander"
    :value-key="props.valueKey || 'id'"
    @change="cander($event)"
    filterable
    :filter-method="searchData"
    :placeholder="props.placeholder"
  >
    <el-option
        v-for="item in list"
        :key="item[props.valueKey || 'id']"
        :label="item[props.showKey || 'name']"
        :value="item"
    />
  </el-select>
</template>
<script setup>
import request from '@/request/index.js'
import {queryContactsFilter} from "@/api/contacts.js";
import {ref} from "vue";
const props = defineProps(['value', 'cander', 'startSearch', 'placeholder', 'showKey', 'sizeKey', 'currentKey', 'responseKey', 'valueKey', 'method', 'url'])
const emit = defineEmits(null)
const list = ref([])
const shake = ref(null)
const searchData = (searchName) => {
  if (searchName === '') return
  clearTimeout(shake.value)
  shake.value = setTimeout(() => {
    request({
      method: props.method || 'GET',
      url: props.url,
      [{ 'GET': 'params', 'POST': 'data' }[props.method || 'GET']]: {
        [props.currentKey || 'current']: 1,
        [props.sizeKey || 'size']: 10,
        [props.showKey || 'name']: searchName
      }
    }).then((res) => {
      list.value = res.data[props.responseKey || 'list']
    })
  }, 1000)
}
if (props.startSearch) {
  searchData(props.startSearch)
}
const cander = (e) => {
  emit('update:cander', e)
  emit('update:value', e[props.valueKey || 'id'])
  emit('cander', e)
}
</script>
<style lang="scss" scoped>
</style>
