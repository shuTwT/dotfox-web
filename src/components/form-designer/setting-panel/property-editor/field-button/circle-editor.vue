<template>
  <el-form-item :label="i18nt('designer.setting.circle')">
    <el-switch v-model="optionModel.circle" />
  </el-form-item>
</template>

<script lang="ts">
import i18n from "@/utils/vform3/i18n";

export default {
  name: "circle-editor",
  mixins: [i18n],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object
  }
};
</script>

<style scoped></style>
