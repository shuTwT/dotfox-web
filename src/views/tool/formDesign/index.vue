<script setup lang="ts">
import VFormDesigner from "@/components/form-designer/index.vue";
import { ref } from "vue";
defineOptions({
  name: "formDesign"
});
const globalDsv = ref({
  testApiHost: "http://www.test.com/api",
  testPort: 8080
});
</script>

<template>
  <div class="form-designer-wrapper">
    <VFormDesigner ref="vfDesignerRef" :global-dsv="globalDsv" />
  </div>
</template>

<style lang="scss" scoped>
.form-designer-wrapper {
  width: 100%;
  height: 100%;
  margin: 0 !important;
}
:deep(.field-action) svg {
  margin-left: 0.35em;
  margin-right: 0.35em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  display: inline-block;
}
:deep(.external-link) svg {
  margin-left: 0.35em;
  margin-right: 0.35em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  display: inline-block;
}
:deep(.el-tabs__item) svg {
  margin-left: 0.35em;
  margin-right: 0.35em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  display: inline-block;
}
</style>
