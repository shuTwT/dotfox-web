<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    noticeId: 0,
    noticeTitle: "",
    noticeType: "1",
    noticeContent: "",
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
    <el-form-item label="公告标题" prop="noticeTitle">
      <el-input
        v-model="newFormInline.noticeTitle"
        clearable
        placeholder="请输入公告标题"
      />
    </el-form-item>

    <el-form-item label="公告类型">
      <el-select
        v-model="newFormInline.noticeType"
        placeholder="请选择类型"
        class="!w-[180px]"
      >
        <el-option label="通知" value="1" />
        <el-option label="公告" value="2" />
      </el-select>
    </el-form-item>

    <el-form-item label="公告状态">
      <el-select
        v-model="newFormInline.status"
        placeholder="请选择状态"
        class="!w-[180px]"
      >
        <el-option label="正常" value="0" />
        <el-option label="关闭" value="1" />
      </el-select>
    </el-form-item>

    <el-form-item label="详细内容">
      <el-input
        v-model="newFormInline.noticeContent"
        placeholder="请输入内容"
        type="textarea"
      />
    </el-form-item>
  </el-form>
</template>
