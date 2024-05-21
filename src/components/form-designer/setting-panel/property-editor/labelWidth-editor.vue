<template>
  <el-form-item :label="i18nt('designer.setting.labelWidth')">
    <el-input
      v-model="optionModel.labelWidth"
      type="number"
      min="0"
      class="hide-spin-button"
      @input="inputNumberHandler"
    />
  </el-form-item>
</template>

<script lang="ts">
import i18n from "@/utils/vform3/i18n";
import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin";

export default {
  name: "labelWidth-editor",
  mixins: [i18n, propertyMixin],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object
  }
};
</script>

<style scoped></style>
