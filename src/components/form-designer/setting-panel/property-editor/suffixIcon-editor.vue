<template>
  <el-form-item :label="i18nt('designer.setting.suffixIcon')">
    <el-input type="text" v-model="optionModel.suffixIcon"></el-input>
  </el-form-item>
</template>

<script lang="ts">
  import i18n from "@/utils/vform3/i18n";

  export default {
    name: "suffixIcon-editor",
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
