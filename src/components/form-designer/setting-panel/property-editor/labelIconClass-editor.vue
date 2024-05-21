<template>
  <div>
    <el-form-item label-width="0">
      <el-divider class="custom-divider">{{
        i18nt("designer.setting.customLabelIcon")
      }}</el-divider>
    </el-form-item>
    <el-form-item :label="i18nt('designer.setting.labelIconClass')">
      <el-input v-model="optionModel.labelIconClass" type="text" />
    </el-form-item>
  </div>
</template>

<script lang="ts">
import i18n from "@/utils/vform3/i18n";

export default {
  name: "labelIconClass-editor",
  mixins: [i18n],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object
  }
};
</script>

<style scoped></style>
