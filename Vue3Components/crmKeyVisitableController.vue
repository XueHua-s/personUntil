<template>
  <el-dialog align-center destroy-on-close
       v-model="props.visitable"
       @close="emit('update:visitable', false)"
       title="编辑显示字段" width="auto"
       :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header bj-h b8t fx fx-a fx-jsb h50 box plr20">
        <h4 :id="titleId" class="f16 b">编辑显示字段</h4>
        <el-button button-gary @click="close">
          <el-icon>
            <Close />
          </el-icon>
        </el-button>
      </div>
    </template>
    <div class="fx fx-a fx-w">
      <el-transfer
      :titles="['显示', '隐藏']"
      v-model="tableControllerData.alive"
      :data="tableControllerData.data"
       filterable
       :filter-method="filterMethod"
       filter-placeholder="请输入需要筛选的字段"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button button-see @click="emit('update:visitable', false)">&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;</el-button>
        <el-button button-edit @click="submitTableController">&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import {Close} from "@element-plus/icons-vue";
import {defineProps, reactive, watch} from "vue"
const props = defineProps(['visitable', 'value'])
const emit = defineEmits(null)
// 显示隐藏穿梭框的数据
const tableControllerData = reactive({
  alive: [],
  data: []
})
const renderData = () => {
  // 生成穿梭框的data
  for (const key in props.value) {
    tableControllerData.data.push({
      key,
      label: props.value[key].label,
      disabled: false
    })
  }
}
renderData()
watch(() => props.visitable, () => {
  if (props.visitable) {
    // 根据tableKeyVisitable隐藏的值, 给穿梭框alive的值
    tableControllerData.alive = []
    // tableControllerData.data = []
    for (const key in props.value) {
      if (!props.value[key].show) {
        tableControllerData.alive.push(key)
      }
    }
  }
})
const filterMethod = (searchName, item) => {
  // console.log(searchName, item)
  if (item.label.indexOf(searchName) !== -1) {
    return true
  }
  return false
}
// 提交穿梭框选中的值
const submitTableController = () => {
  for (const key in props.value) {
    props.value[key].show = true
  }
  for (const hiddenKey of tableControllerData.alive) {
    props.value[hiddenKey].show = false
  }
  emit('update:visitable', false)
  emit('submit')
}
</script>
<style lang="scss" scoped>
</style>

