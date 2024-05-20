<template>
  <el-form-item :label="i18nt('designer.setting.placeholder')">
    <el-input type="text" v-model="optionModel.placeholder"></el-input>
  </el-form-item>
</template>

<script lang="ts">
  import i18n from "@/utils/vform3/i18n"
  import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin"

  export default {
    name: "placeholder-editor",
    mixins: [i18n, propertyMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
