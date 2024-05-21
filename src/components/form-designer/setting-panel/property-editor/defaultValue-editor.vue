<template>
  <el-form-item
    v-if="!hasConfig('optionItems')"
    :label="i18nt('designer.setting.defaultValue')"
  >
    <el-input
      v-model="optionModel.defaultValue"
      type="text"
      @change="emitDefaultValueChange"
    />
  </el-form-item>
</template>

<script lang="ts">
import i18n from "@/utils/vform3/i18n";
import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin";

export default {
  name: "defaultValue-editor",
  mixins: [i18n, propertyMixin],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object
  }
};
</script>

<style scoped></style>
