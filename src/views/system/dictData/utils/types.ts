// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  /** 字典编码 */
  dictCode: number;
  /** 字典排序 */
  dictSort: number;
  /** 字典标签 */
  dictLabel: string;
  /** 字典键值 */
  dictValue: string;
  /** 字典类型 */
  dictType: string;
  /** 状态 */
  status: string;
  /** 备注 */
  remark: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
