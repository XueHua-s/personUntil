<template>
  <NSelect
      v-if="threeType !== 'three'"
      :multiple="props.multiple"
      v-model:value="aliveValue"
      :options="searchList"
      :filterable="openSearch"
      @search="search"
      :placeholder="props.placeholder"
      :disabled="props.disabled">
  </NSelect>
  <NTreeSelect
      v-else
      v-model:value="aliveValue"
      :multiple="props.multiple"
      :children-field="props.childrenKey"
      cascade
      :key-field="props.valueKey"
      :label-field="props.showKey || props.searchKey"
      checkable
      :options="searchList"
      :default-value="['Norwegian Wood']"
  />
</template>
<script setup>
import { NSelect, NTreeSelect } from 'naive-ui'
import { ref, watch, onUnmounted } from 'vue'
import { shakeFun } from '@/untils/shakeAndThrottle'
const props = defineProps({
  multiple: {
    default: false
  },
  threeType: {
    default: 'select'
  },
  childrenKey: {
    default: 'children'
  },
  openSearch: {
    default: true,
    type: Boolean
  },
  searchFun: {
    type: Function,
    required: true
  },
  searchSize: {
    default: 10,
    type: Number
  },
  searchKey: {
    type: String,
    default: 'name'
  },
  showKey: {
    type: String,
    default: null
  },
  listOver: {
    type: String,
    required: true
  },
  value: {
    required: true
  },
  valueKey: {
    type: String,
    default: 'id'
  },
  placeholder: {
    type: String,
    default: '请搜索'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  startSearch: {
    default: ''
  },
  showAll: {
    default: ''
  },
  polling: {
    default: false
  }
})
const emit = defineEmits(['update:value', 'cander'])
const aliveValue = ref('')
const searchList = ref([])
const loadAlive = () => {
  aliveValue.value = props.value
}
loadAlive()
const requestFun = shakeFun(async (name) => {
  if (name !== '') {
    const { data } = await props.searchFun({
      current: 1,
      size: props.searchSize,
      [props.searchKey]: name
    })
    if (data.code === 0) {
      // eslint-disable-next-line no-eval
      searchList.value = eval(props.listOver)?.map((item) => ({
        label: item[props.showKey || props.searchKey],
        ...item,
        value: item[props.valueKey]
      }))
      if (props.showAll !== '') {
        searchList.value.unshift({
          label: props.showAll,
          value: ''
        })
      }
    }
  }
}, 1000)
let search = null
if (props.polling) {
  search = setInterval(() => {
    // console.log('轮询')
    requestFun(props.startSearch)
  }, props.polling)
  onUnmounted(() => {
    clearInterval(search)
  })
} else {
  search = requestFun
}
if (props.startSearch !== '' && !props.polling) {
  search(props.startSearch)
}
watch(() => props.value, (val) => {
  aliveValue.value = val
})
watch(() => aliveValue.value, (val) => {
  emit('update:value', val)
  emit('cander', searchList.value.find((item) => item.value === val))
})
watch(() => props.startSearch, () => {
  if (props.startSearch !== '') {
    search(props.startSearch)
  }
})
</script>
<style lang="scss" scoped>
</style>
