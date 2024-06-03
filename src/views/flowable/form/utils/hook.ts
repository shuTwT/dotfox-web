import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection } from "@pureadmin/utils";
import { h, onMounted, reactive, ref, toRaw } from "vue";
import type { FormItemProps } from "./types";
import editForm from "../form.vue";
import modelForm from "../model.vue";
import { formList, addForm, updateForm, removeForm } from "@/api/flowable/form";

export function useExpression() {
  const form = reactive({
    name: "",
    state: ""
  });
  const curRow = ref();
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });

  const columns: TableColumnList = [
    {
      label: "表单编号",
      prop: "formId"
    },
    {
      label: "表单名称",
      prop: "formName"
    },
    {
      label: "分类",
      prop: "category"
    },
    {
      label: "版本号",
      prop: "version"
    },
    {
      label: "是否主版本",
      prop: "isPrimary"
    },
    {
      label: "备注",
      prop: "remark"
    },
    {
      label: "操作",
      fixed: "right",
      width: 210,
      slot: "operation"
    }
  ];

  async function onSearch() {
    loading.value = true;
    const { data } = await formList(toRaw(form));
    dataList.value = data.records;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  /** 高亮当前权限选中行 */
  function rowStyle({ row: { id } }) {
    return {
      cursor: "pointer",
      background: id === curRow.value?.id ? "var(--el-fill-color-light)" : ""
    };
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}流程`,
      props: {
        formInline: {
          formName: row?.formName ?? "",
          category: row?.category ?? ""
        }
      },
      width: "40%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了角色名称为${curData.formName}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              addForm(curData).then(() => {
                // 实际开发先调用新增接口，再进行下面操作
                chores();
              });
            } else {
              updateForm(row.formId, curData).then(() => {
                // 实际开发先调用修改接口，再进行下面操作
                chores();
              });
            }
          }
        });
      }
    });
  }

  function openDialog2(title = "新增", row?: FormItemProps) {
    const modelRef = ref();
    addDialog({
      title: `设计流程表单`,
      props: {
        formInline: {
          formContent: row?.formContent ?? ""
        }
      },
      width: "40%",
      draggable: true,
      fullscreen: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(modelForm, { ref: modelRef }),
      beforeSure: (done, { options }) => {
        const vfDesignerRef = modelRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了角色名称为${curData.formName}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        const formJson = vfDesignerRef.getFormJson();
        console.log("curData", curData);
        updateForm(row.formId, {
          ...toRaw(curData),
          formContent: JSON.stringify(formJson)
        }).then(() => {
          // 实际开发先调用修改接口，再进行下面操作
          chores();
        });
      }
    });
  }

  function handleDelete(row) {
    removeForm(row.formId).then(res => {
      if (res.code === 200) {
        message(`您删除了角色名称为${row.formName}的这条数据`, {
          type: "success"
        });
        onSearch();
      }
    });
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    curRow,
    formRef,
    dataList,
    loading,
    pagination,
    columns,
    onSearch,
    rowStyle,
    openDialog,
    openDialog2,
    resetForm,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
