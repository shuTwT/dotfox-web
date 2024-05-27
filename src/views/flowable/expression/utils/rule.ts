import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "名称为必填项", trigger: "blur" }],
  type: [{ required: true, message: "监听类型为必填项", trigger: "blur" }],
  eventType: [{ required: true, message: "事件类型为必填项", trigger: "blur" }],
  valueType: [{ required: true, message: "值类型为必填项", trigger: "blur" }],
  value: [{ required: true, message: "执行内容为必填项", trigger: "blur" }],
});
