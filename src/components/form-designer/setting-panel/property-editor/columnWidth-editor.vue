<template>
  <div>
    <el-form-item
      v-show="!!subFormChildWidgetFlag"
      :label="i18nt('designer.setting.widgetColumnWidth')"
    >
      <el-input v-model="optionModel.columnWidth" type="text" />
    </el-form-item>
  </div>
</template>

<script lang="ts">
import i18n from "@/utils/vform3/i18n";

export default {
  name: "columnWidth-editor",
  mixins: [i18n],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object
  },
  data() {
    return {
      //subFormChildWidgetFlag: false,
      subFormChildWidgetFlag: true
    };
  },
  created() {},
  mounted() {
    this.designer.handleEvent("field-selected", parentWidget => {
      this.subFormChildWidgetFlag =
        !!parentWidget && parentWidget.type === "sub-form";
      //console.log('subFormChildWidgetFlag', this.subFormChildWidgetFlag)
    });
  }
};
</script>

<style scoped></style>
