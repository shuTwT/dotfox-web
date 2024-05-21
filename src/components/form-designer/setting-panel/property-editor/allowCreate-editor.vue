<template>
  <el-form-item :label="i18nt('designer.setting.allowCreate')">
    <el-switch v-model="optionModel.allowCreate" />
  </el-form-item>
</template>

<script lang="ts">
import i18n from "@/utils/vform3/i18n";

export default {
  name: "allowCreate-editor",
  mixins: [i18n],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object
  }
};
</script>

<style scoped></style>
