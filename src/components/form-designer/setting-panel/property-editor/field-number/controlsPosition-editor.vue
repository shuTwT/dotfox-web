<template>
  <el-form-item :label="i18nt('designer.setting.controlsPosition')">
    <el-select v-model="optionModel.controlsPosition">
      <el-option label="default" value=""></el-option>
      <el-option label="right" value="right"></el-option>
    </el-select>
  </el-form-item>
</template>

<script lang="ts">
  import i18n from "@/utils/vform3/i18n"

  export default {
    name: "controlsPosition-editor",
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },

  }
</script>

<style scoped>

</style>
