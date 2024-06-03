<script setup lang="ts">
import { onMounted, ref } from "vue";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    formName: "",
    category: "",
    formContent: "",
    remark: ""
  })
});

const globalDsv = ref({
  testApiHost: "http://www.test.com/api",
  testPort: 8080
});
const vfDesignerRef = ref();

function getRef() {
  return vfDesignerRef.value;
}

onMounted(() => {
  getRef().setFormJson(props.formInline.formContent);
});
defineExpose({ getRef });
</script>

<template>
  <div class="form-designer-wrapper">
    <VFormDesigner ref="vfDesignerRef" :global-dsv="globalDsv" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.svg-icon) {
  display: inline-block;
}

.form-designer-wrapper {
  width: 100%;
  height: 800px;
  margin: 0 !important;

  .main-container {
    margin-left: 0 !important;
  }
}
</style>
