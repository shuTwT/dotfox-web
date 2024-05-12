<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    configId: 0,
    configName: "",
    configKey: "",
    configValue: "",
    configType: "",
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
    <el-form-item label="参数名称" prop="configName">
      <el-input
        v-model="newFormInline.configName"
        clearable
        placeholder="请输入参数名称"
      />
    </el-form-item>

    <el-form-item label="参数键名" prop="configKey">
      <el-input
        v-model="newFormInline.configKey"
        clearable
        placeholder="请输入参数键名"
      />
    </el-form-item>

    <el-form-item label="参数键值" prop="configValue">
      <el-input
        v-model="newFormInline.configValue"
        clearable
        placeholder="请输入参数键值"
      />
    </el-form-item>

    <el-form-item label="是否内置">
      <el-select
        v-model="newFormInline.configType"
        placeholder="请选择类型"
        class="!w-[180px]"
      >
        <el-option label="是" value="0" />
        <el-option label="否" value="1" />
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
