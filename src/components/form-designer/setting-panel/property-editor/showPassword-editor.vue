<template>
  <el-form-item
    v-if="optionModel.type === 'password'"
    :label="i18nt('designer.setting.showPassword')"
  >
    <el-switch v-model="optionModel.showPassword" />
  </el-form-item>
</template>

<script lang="ts">
import i18n from "@/utils/vform3/i18n";

export default {
  name: "showPassword-editor",
  mixins: [i18n],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object
  }
};
</script>

<style scoped></style>
