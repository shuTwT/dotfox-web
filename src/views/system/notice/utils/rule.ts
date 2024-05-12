import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  noticeTitle: [{ required: true, message: "标题为必填项", trigger: "blur" }]
});
