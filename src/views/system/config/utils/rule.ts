import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  configName: [{ required: true, message: "名称为必填项", trigger: "blur" }],
  configKey: [{ required: true, message: "键为必填项", trigger: "blur" }]
});
