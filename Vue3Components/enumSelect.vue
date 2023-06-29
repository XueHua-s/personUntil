<template>
  <el-select
  v-model="props.value" @change="emit('update:value', $event);emit('change', $event);"
  :placeholder="props.placeholder">
    <el-option v-for="key of Object.keys(props.enum)" :value="optionValueTypeComputed(key)" :label="props.enum[key]" />
  </el-select>
</template>
<script setup>
const props = defineProps(['value', 'enum', 'placeholder'])
const emit = defineEmits(null)
const optionValueTypeComputed = (value) => {
  if (typeof props.value === 'string') {
    return value
  } else if (typeof props.value === 'number') {
    return parseInt(value)
  }
  return value
}
</script>
<style lang="scss" scoped>
</style>
