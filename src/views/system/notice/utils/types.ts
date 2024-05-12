// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  noticeId: number;
  /** 通知公告标题 */
  noticeTitle: string;
  /** 通知公告类型 */
  noticeType: string;
  /** 通知公告公告内容 */
  noticeContent: string;
  /** 通知公告状态 */
  status: string;
  /** 备注 */
  remark: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
