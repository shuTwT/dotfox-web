<script setup lang='ts'>
// https://github.com/moon-studio/vite-vue-bpmn-process
import {ElMessage} from 'element-plus'

import { ref } from 'vue'

const iframeRef=ref()
const iframeLoadFailed=ref(false)
const iframeSrc = ref("https://moon-studio.github.io/vite-vue-bpmn-process/")

const handleIframeLoad=()=>{
  if(iframeRef.value.contentWindow.document.body){

  }else{
    iframeLoadFailed.value=true
  }
}
</script>

<template>
  <div>
    <iframe v-if="!iframeLoadFailed" ref="iframeRef" :src="iframeSrc" class="iframe" @load="handleIframeLoad"></iframe>
    <template v-else>bpmn流程设计器通过iframe来集成</template>

  </div>
</template>
<style scoped>
.iframe{
  width: 100%;
  height: 720px;
}
</style>
