<template>
  <el-form-item :label="i18nt('designer.setting.defaultValue')">
    <el-date-picker
      v-model="optionModel.defaultValue"
      :type="optionModel.type"
      :format="optionModel.format"
      :value-format="optionModel.valueFormat"
      style="width: 100%"
      @change="emitDefaultValueChange"
    />
  </el-form-item>
</template>

<script lang="ts">
import i18n from "@/utils/vform3/i18n";
import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin";

export default {
  name: "date-range-defaultValue-editor",
  mixins: [i18n, propertyMixin],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object
  }
};
</script>

<style scoped></style>
