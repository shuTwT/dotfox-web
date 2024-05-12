import { reactive } from "vue";
import type { FormRules } from "element-plus";

export const basicInfoFormRules = reactive<FormRules>({
  tableName: [{ required: true, message: "请输入表名称", trigger: "blur" }],
  tableComment: [{ required: true, message: "请输入表描述", trigger: "blur" }],
  className: [{ required: true, message: "请输入实体类名称", trigger: "blur" }],
  functionAuthor: [{ required: true, message: "请输入作者", trigger: "blur" }]
});

export const genInfoFormRules = reactive<FormRules>({
  tplCategory: [{ required: true, message: "请选择生成模板", trigger: "blur" }],
  packageName: [
    { required: true, message: "请输入生成包路径", trigger: "blur" }
  ],
  moduleName: [
    { required: true, message: "请输入生成模块名", trigger: "blur" }
  ],
  businessName: [
    { required: true, message: "请输入生成业务名", trigger: "blur" }
  ],
  functionName: [
    { required: true, message: "请输入生成功能名", trigger: "blur" }
  ]
});
