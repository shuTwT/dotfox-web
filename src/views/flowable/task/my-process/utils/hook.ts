import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection } from "@pureadmin/utils";
import { h, reactive, ref } from "vue";
import type { FormItemProps } from "./types";
import editForm from "../form.vue";

export function useExpression() {
  const form = reactive({
    name: "",
    startTime: "",
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
      label: "流程编号",
      prop: "id"
    },
    {
      label: "流程名称",
      prop: "name"
    },
    {
      label: "流程类别",
      prop: "listenerType"
    },
    {
      label: "流程版本",
      prop: "eventType"
    },
    {
      label: "提交时间",
      prop: "valueType"
    },
    {
      label: "流程状态",
      prop: "value"
    },
    {
      label: "耗时",
      prop: "remark"
    },
    {
      label: "当前节点",
      prop: "currentNode"
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
    //const { data } = await getFlowableDefinitionsList(toRaw(form));
    const data = { list: [], total: 0, pageSize: 10, currentPage: 0 };
    dataList.value = data.list;
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
          name: row?.name ?? ""
        }
      },
      width: "80%",
      hideFooter: true,
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了角色名称为${curData.name}的这条数据`, {
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
              // 实际开发先调用新增接口，再进行下面操作
              chores();
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              chores();
            }
          }
        });
      }
    });
  }

  function handleDelete(row) {
    message(`您删除了角色名称为${row.name}的这条数据`, { type: "success" });
    onSearch();
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
    resetForm,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
