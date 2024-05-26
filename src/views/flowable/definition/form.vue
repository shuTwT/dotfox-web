<script setup lang="ts">
// https://github.com/moon-studio/vite-vue-bpmn-process
import { ElMessage } from "element-plus";

import { nextTick, onMounted, ref } from "vue";

const iframeWindow = ref();
const iframeRef = ref();
const iframeSrc = ref("http://vue.shugram.com/bpmn/designer");
// https://moon-studio.github.io/vite-vue-bpmn-process/

const handleOnload=()=>{
  initData()
}
/**
 * 初始化数据
 */
const initData = () => {
  const tempXml = ``;
  // 这里处理xml
  // if (iframeWindow.value) {
  //   iframeWindow.value.setBpmnXml(tempXml).then(res => {
  //     debugger;
  //     console.log("======================XML加载成功！");
  //     console.log(res);
  //   });
  // }
  console.log(iframeWindow.value)
};

/**
 * 保存
 */
const doSave=()=>{

}

onMounted(() => {
    iframeWindow.value = iframeRef.value.contentWindow;
});
</script>

<template>
  <div>
    <iframe ref="iframeRef" :src="iframeSrc" class="iframe" @load="handleOnload"></iframe>
  </div>
</template>
<style scoped>
.iframe {
  width: 100%;
  height: 720px;
}
</style>
