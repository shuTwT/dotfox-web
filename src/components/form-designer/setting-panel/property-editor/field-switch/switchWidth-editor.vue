<template>
  <el-form-item :label="i18nt('designer.setting.switchWidth')">
    <el-input-number v-model="optionModel.switchWidth" style="width: 100%" />
  </el-form-item>
</template>

<script lang="ts">
import i18n from "@/utils/vform3/i18n";

export default {
  name: "switchWidth-editor",
  mixins: [i18n],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object
  }
};
</script>

<style scoped></style>
