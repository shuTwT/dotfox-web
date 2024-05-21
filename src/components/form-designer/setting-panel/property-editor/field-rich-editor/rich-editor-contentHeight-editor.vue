<template>
  <div>
    <el-form-item :label="i18nt('designer.setting.contentHeight')">
      <el-input v-model="optionModel.contentHeight" type="text" />
    </el-form-item>
  </div>
</template>

<script lang="ts">
import i18n from "@/utils/vform3/i18n";

export default {
  name: "rich-editor-contentHeight-editor",
  mixins: [i18n],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object
  }
};
</script>

<style scoped></style>
