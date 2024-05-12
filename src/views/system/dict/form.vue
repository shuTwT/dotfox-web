<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    dictId: 0,
    dictName: "",
    dictType: "",
    status: "0",
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
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="字典名称" prop="dictName">
      <el-input
        v-model="newFormInline.dictName"
        clearable
        placeholder="请输入字典名称"
      />
    </el-form-item>

    <el-form-item label="字典类型" prop="dictType">
      <el-input
        v-model="newFormInline.dictType"
        clearable
        placeholder="请输入字典类型"
      />
    </el-form-item>

    <el-form-item label="字典状态">
      <el-select
        v-model="newFormInline.status"
        placeholder="请选择状态"
        class="!w-[180px]"
      >
        <el-option label="正常" value="0" />
        <el-option label="停用" value="1" />
      </el-select>
    </el-form-item>

    <el-form-item label="备注">
      <el-input
        v-model="newFormInline.remark"
        placeholder="请输入内容"
        type="textarea"
      />
    </el-form-item>
  </el-form>
</template>
