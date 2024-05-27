<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    name: "",
    expression: "",
    remark: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form ref="ruleFormRef" :model="newFormInline" :rules="formRules" label-width="80px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="newFormInline.name" placeholder="请输入名称" />
    </el-form-item>
    <el-form-item label="表达式" prop="expression">
      <el-input v-model="newFormInline.expression" placeholder="请输入表达式" />
    </el-form-item>
    <el-form-item
      label="备注"
      prop="remark"
    >
    <el-input v-model="newFormInline.remark" placeholder="请输入备注" />
    </el-form-item>
  </el-form>
</template>
