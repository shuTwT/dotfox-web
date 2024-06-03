<script setup lang="ts">
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
:deep(.svg-icon) {
  display: inline-block;
}

.form-designer-wrapper {
  width: 100%;
  height: 100%;
  margin: 0 !important;

  .main-container {
    margin-left: 0 !important;
  }
}
</style>
