<template>
  <el-form-item :label="i18nt('designer.setting.textAlign')" v-if="(selectedWidget.type === 'static-text')">
    <el-radio-group v-model="optionModel.textAlign" class="radio-group-custom">
      <el-radio-button label="left" value="left">
        {{i18nt('designer.setting.leftAlign')}}</el-radio-button>
      <el-radio-button label="center" value="center">
        {{i18nt('designer.setting.centerAlign')}}</el-radio-button>
      <el-radio-button label="right" value="right">
        {{i18nt('designer.setting.rightAlign')}}</el-radio-button>
    </el-radio-group>
  </el-form-item>
</template>

<script lang="ts">
  import i18n from "@/utils/vform3/i18n"

  export default {
    name: "textAlign-editor",
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style lang="scss" scoped>
  .radio-group-custom {
    :deep(.el-radio-button__inner) {
      padding-left: 12px;
      padding-right: 12px;
    }
  }
</style>
