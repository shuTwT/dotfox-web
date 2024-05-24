import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import { PaginationProps } from "@pureadmin/table";
import { deviceDetection } from "@pureadmin/utils";
import { h, reactive, ref } from "vue";
import { FormItemProps } from "./types";
import editForm from "../form.vue"

export function useExpression(){
  const form = reactive({
    name:"",
    state:""
  })
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

  const columns: TableColumnList=[
    {
      label: "表达式编号",
      prop: "id"
    },
    {
      label: "监听器名称",
      prop: "name"
    },
    {
      label: "监听类型",
      prop: "listenerType"
    },
    {
      label: "事件类型",
      prop: "eventType"
    },
    {
      label: "值类型",
      prop: "valueType"
    },
    {
      label: "值",
      prop: "value"
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
  ]

  async function onSearch() {
    loading.value = true;
    //const { data } = await getFlowableDefinitionsList(toRaw(form));
    const data = { list: [], total: 0, pageSize: 10, currentPage: 0 }
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
            name: row?.name ?? "",
          }
        },
        width: "80%",
        hideFooter:true,
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
  }
}
