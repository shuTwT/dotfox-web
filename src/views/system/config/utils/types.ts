// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  configId: number;
  /** 参数名字 */
  configName: string;
  /** 参数键 */
  configKey: string;
  /** 参数值 */
  configValue: string;
  /** 参数类型 */
  configType: string;
  /** 备注 */
  remark: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
