<template>
  <el-form-item :label="i18nt('designer.setting.prefixIcon')">
    <el-input type="text" v-model="optionModel.prefixIcon"></el-input>
  </el-form-item>
</template>

<script lang="ts">
  import i18n from "@/utils/vform3/i18n";

  export default {
    name: "prefixIcon-editor",
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
