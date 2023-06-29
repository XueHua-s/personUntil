<template>
  <div class="pdf-preview" ref="pdfRef">
    <vue-pdf-embed :source="state.source" :style="scale" class="vue-pdf-embed" :page="state.pageNum" />
    <div v-if="state.numPages > 1 && props.pageShow === true" class="page-tool" ref="pageRef">
      <div class="page-tool-item" @click="lastPage">上一页</div>
      <div class="page-tool-item" @click="nextPage">下一页</div>
      <div class="page-tool-item">{{state.pageNum}}/{{state.numPages}}</div>
      <div class="page-tool-item" @click="pageZoomOut">放大</div>
      <div class="page-tool-item" @click="pageZoomIn">缩小</div>
    </div>
  </div>
</template>
<script setup>
import {reactive, onMounted, computed, ref} from 'vue'
import VuePdfEmbed from "vue-pdf-embed";
import { createLoadingTask } from "vue3-pdfjs";
const props = defineProps({
  pdfUrl: {
    type: String,
    required: true
  },
  pageShow: {
    type: Boolean,
    required: false,
    default: true
  }
})
const pdfRef = ref(null)
const pageRef = ref(null)
// const pdfRefShow = ref(null)
const state = reactive({
  source: props.pdfUrl,
  pageNum: 1,
  scale: 1, // 缩放比例
  numPages: 0, // 总页数
});
const scale = computed(() => `transform:scale(${state.scale})`)
function lastPage() {
  if (state.pageNum > 1) {
    state.pageNum -= 1;
  }
}
function nextPage() {
  if (state.pageNum < state.numPages) {
    state.pageNum += 1;
  }
}
function pageZoomOut() {
  // if (state.scale < 2) {
  //   state.scale += 0.1;
  // }
  state.pageNum += 1;
  // pdfRefShow.value.style.width = 'auto'
  // pdfRefShow.value.style.height = '100vh'
  pdfRef.value.requestFullscreen().then(() => {
    state.pageNum -= 1;
  })
  pageRef.value.style.position = 'fixed'
}
function pageZoomIn() {
  // if (state.scale > 1) {
  //   state.scale -= 0.1;
  // }
  state.pageNum += 1;
  // pdfRefShow.value.style.width = '100%'
  // pdfRefShow.value.style.height = 'auto'
  document.exitFullscreen().then(() => {
    state.pageNum -= 1;
  })
  pageRef.value.style.position = 'absolute'
}
// 网页窗口大小变化，重新渲染pdf的方法
const resizeRenderPdf = () => {
  state.pageNum += 1;
  setTimeout(() => {
    state.pageNum -= 1;
  }, 200)
}
onMounted(() => {
  const loadingTask = createLoadingTask(state.source);
  loadingTask.promise.then((pdf) => {
    state.numPages = pdf.numPages;
  })
  // 添加窗口变化事件委托
  document.addEventListener('resize', resizeRenderPdf)
})
unmounted(() => {
  // 组件被卸载移除事件委托
  document.removeEventListener('resize', resizeRenderPdf)
})
</script>
<style lang="scss" scoped>
.pdf-preview {
  position: relative;
  width: 100%;
  height: auto;
  //padding: 20px 0;
  overflow-y: auto;
  box-sizing: border-box;
  background-color: #e9e9e9;
}
.pdf-wrap{
  overflow-y:auto ;
}
.vue-pdf-embed {
  text-align: center;
  width: 100%;
  border: 1px solid #e5e5e5;
  margin: 0 auto;
  box-sizing: border-box;
}

.page-tool {
  position: absolute;
  width: 80%;
  left: 50%;
  bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(66, 66, 66, 0.6);
  color: white;
  border-radius: 19px;
  z-index: 100;
  cursor: pointer;
  //margin-left: 50%;
  transform: translateX(-50%);
}
.page-tool-item {
  //padding: 8px 15px;
  padding: 10px 0;
  padding-left: 10px;
  cursor: pointer;
  &:hover {
    color: #FE962D;
  }
}
</style>
