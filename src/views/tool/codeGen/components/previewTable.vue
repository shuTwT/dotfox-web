<script setup lang="ts">
import { ref } from "vue";
import { PreviewTableProps } from "../utils/types";
import { message } from "@/utils/message";

defineOptions({
  name: "PreviewTable"
});
const activeName = ref("domain.java");
const previewData = ref([]);
const props = withDefaults(defineProps<PreviewTableProps>(), {});
function transPane(key: number) {
  return (key + "").substring(
    (key + "").lastIndexOf("/") + 1,
    (key + "").indexOf(".vm")
  );
}
function highlightedCode(value: string, key: number) {}
function clipboardSuccess() {
  message("复制成功", {
    type: "success"
  });
}
</script>

<template>
  <el-tabs v-model="activeName">
    <el-tab-pane
      v-for="(value, key) in previewData"
      :key="key"
      :label="transPane(key)"
      :name="transPane(key)"
    >
      <el-link
        v-clipboard:copy="value"
        v-clipboard:success="clipboardSuccess"
        :underline="false"
        icon="el-icon-document-copy"
        style="float: right"
        >复制</el-link
      >
      <pre><code class="hljs" v-html="highlightedCode(value, key)"/></pre>
    </el-tab-pane>
  </el-tabs>
</template>
