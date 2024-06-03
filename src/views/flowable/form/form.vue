<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    formName: "",
    category: "",
    remark: "",
  })
});

const formTypeList = [
  { label: "测试表单", value: "0"},
  { label: "办公表单", value: "1"}
]


const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form ref="ruleFormRef" :model="newFormInline" :rules="formRules" label-width="80px">
    <el-form-item label="表单名称" prop="formName">
      <el-input v-model="newFormInline.formName" placeholder="请输入名称" />
    </el-form-item>
    <el-form-item label="分类" prop="category">
      <el-select v-model="newFormInline.category" placeholder="请选择表单分类">
        <el-option
          v-for="dict in formTypeList"
          :key="dict.value"
          :label="dict.label"
          :value="dict.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      label="备注"
      prop="remark"
    >
    <el-input v-model="newFormInline.remark" placeholder="请输入名称" />
    </el-form-item>

  </el-form>
</template>
