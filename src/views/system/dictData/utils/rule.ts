import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  dictLabel: [{ required: true, message: "标签为必填项", trigger: "blur" }],
  dictValue: [{ required: true, message: "键值为必填项", trigger: "blur" }]
});
