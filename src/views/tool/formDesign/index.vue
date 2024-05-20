<script setup lang="ts">
import VFormDesigner from "@/components/form-designer/index.vue"
import { ref } from "vue";
defineOptions({
  name: "formDesign"
});
const globalDsv = ref({
  testApiHost:"",
  testPort:8080
})
</script>

<template>
  <div class="form-designer-wrapper">
    <VFormDesigner ref="vfDesignerRef" :global-dsv="globalDsv">

    </VFormDesigner>
  </div>
</template>

<style lang="scss" scoped>
.form-designer-wrapper {
  width: 100%;
  height: 100%;
  margin: 0 !important;
}
</style>
