<script setup lang="ts">
// https://github.com/moon-studio/vite-vue-bpmn-process
import { ElMessage } from "element-plus";
import { formRules } from "./utils/rule"
import { onBeforeUnmount, onMounted, ref } from "vue";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    xml: "",
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

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

const handleMessage=(e)=>{
  if(e.origin==='http://vue.shugram.com'){
    if(typeof e.data==='string'){
      try{
        const data=JSON.parse(e.data)
        if(data.origin==='bpmn-process'&&data.type==='save'){
          const xml = data.xml
          newFormInline.value.xml=xml
        }
      }catch(error){
        console.error(error)
      }
    }
  }
}

onMounted(() => {
    iframeWindow.value = iframeRef.value.contentWindow;
    window.addEventListener('message',handleMessage)
});

onBeforeUnmount(()=>{
  window.removeEventListener('message',handleMessage)
})

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form ref="ruleFormRef" :model="newFormInline" :rules="formRules" label-width="80px">
    <iframe ref="iframeRef" :src="iframeSrc" class="iframe" @load="handleOnload"></iframe>
  </el-form>
</template>
<style scoped>
.iframe {
  width: 100%;
  height: 720px;
}
</style>
