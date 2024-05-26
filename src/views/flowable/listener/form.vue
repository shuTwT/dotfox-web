<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    name: "",
    type: "",
    eventType: "",
    valueType: "",
    value: ""
  })
});

const listenerTypeList = [
  { label: "任务监听", value: "0"},
  { label: "执行监听", value: "1"}
]

const taskListenerEventList = [
  { label: "create", value: "create" },
  { label: "assignment", value: "assignment" },
  { label: "complete", value: "complete" },
  { label: "delete", value: "delete" }
];

const executionListenerEventList = [
  { label: "start", value: "start" },
  { label: "end", value: "end" },
  { label: "take", value: "take" }
];

const valueTypeList = [
{ label: "java类", value: "0" },
{ label: "表达式", value: "1" },
{ label: "代理表达式", value: "2" },
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
    <el-form-item label="名称" prop="name">
      <el-input v-model="newFormInline.name" placeholder="请输入名称" />
    </el-form-item>
    <el-form-item label="监听类型" prop="type">
      <el-select v-model="newFormInline.type" placeholder="请选择监听类型">
        <el-option
          v-for="dict in listenerTypeList"
          :key="dict.value"
          :label="dict.label"
          :value="dict.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      label="事件类型"
      prop="eventType"
      v-if="newFormInline.type === '1'"
    >
      <el-select v-model="newFormInline.eventType" placeholder="请选择事件类型">
        <el-option
          v-for="dict in taskListenerEventList"
          :key="dict.value"
          :label="dict.label"
          :value="dict.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="事件类型" prop="eventType" v-else>
      <el-select v-model="newFormInline.eventType" placeholder="请选择事件类型">
        <el-option
          v-for="dict in executionListenerEventList"
          :key="dict.value"
          :label="dict.label"
          :value="dict.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="值类型" prop="valueType">
      <el-radio-group v-model="newFormInline.valueType">
        <el-radio
          v-for="dict in valueTypeList"
          :key="dict.value"
          :value="dict.value"
          >{{ dict.label }}</el-radio
        >
      </el-radio-group>
    </el-form-item>
    <el-form-item label="执行内容" prop="value">
      <el-input v-model="newFormInline.value" placeholder="请输入执行内容" />
    </el-form-item>
  </el-form>
</template>
