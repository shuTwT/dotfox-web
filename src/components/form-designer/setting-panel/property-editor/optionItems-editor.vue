<template>
  <el-form-item label-width="0">
    <el-divider class="custom-divider-margin-top">{{
      i18nt("designer.setting.optionsSetting")
    }}</el-divider>
    <option-items-setting
      :designer="designer"
      :selected-widget="selectedWidget"
    />
  </el-form-item>
</template>

<script lang="ts">
import i18n from "@/utils/vform3/i18n";
import OptionItemsSetting from "@/components/form-designer/setting-panel/option-items-setting.vue";

export default {
  name: "optionItems-editor",
  components: {
    OptionItemsSetting
  },
  mixins: [i18n],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object
  }
};
</script>

<style scoped></style>
