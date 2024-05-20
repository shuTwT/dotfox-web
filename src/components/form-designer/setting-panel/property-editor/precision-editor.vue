<template>
  <el-form-item :label="i18nt('designer.setting.precision')">
    <el-input-number v-model="optionModel.precision" :min="0" class="hide-spin-button" style="width: 100%"></el-input-number>
  </el-form-item>
</template>

<script lang="ts">
  import i18n from "@/utils/vform3/i18n"

  export default {
    name: "precision-editor",
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
