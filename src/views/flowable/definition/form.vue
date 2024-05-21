<script setup lang='ts'>
import {ElMessage} from 'element-plus'
import BpmnModeler from 'bpmn-js/lib/Modeler.js'
// 导入一下有关于bpmn-js的字体库以及样式文件
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import xmlStr from "./utils/xml"

import { onMounted , reactive ,ref } from 'vue'

const canvasRef=ref()
const state = reactive<any>({
  bpmnModeler:null,
  bpmnXmlStr:xmlStr
})

// 注意：必须先加载一个bpmn文件，新建就是加载一个空的bpmn文件，否则不能拖拽节点
const createNewDiagram = async (bpmn: any) => {
  // 将字符串转换成图显示出来
  try {
    const result = await state.bpmnModeler.importXML(bpmn);
    // state.bpmnModeler.get('canvas').zoom('fit-viewport');
    const {warnings} = result;
    console.log(warnings);
  } catch (e) {
    ElMessage.error('打开模型出错，数据格式有误！')
    console.log('error--->', e)
  }
};


const init=()=>{
  // 生成实例
  state.bpmnModeler = new BpmnModeler({
    container: canvasRef.value, // 获取到属性ref为“canvasRef”的dom节点
    // propertiesPanel: {
    //   parent: '#js-properties-panel'
    // },
    // additionalModules: [
    //   BpmnPropertiesPanelModule,
    //   BpmnPropertiesProviderModule,
    //   //  汉化模块
    //   customTranslateModule
    //  ],
    // moddleExtensions: {
    //   camunda: CamundaBpmnModdle
    // }
  })
  createNewDiagram(state.bpmnXmlStr) // 新增流程定义
}
onMounted(()=>{
  init()
})
</script>

<template>
  <div>
    <ElContainer class="design">
      <ElContainer direction="vertical">
        <ElHeader></ElHeader>
        <ElMain>
          <div class="canvas" ref="canvasRef"></div>
        </ElMain>
      </ElContainer>
      <ElAside class="design-aside">
        <div id="js-properties-panel"></div>
      </ElAside>
    </ElContainer>
  </div>
</template>
<style scoped>
.canvas{
  width: 100%;
  height: 700px;
}
.design-aside{
  width:300px;
}
</style>
