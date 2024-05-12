import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps } from "./types";
import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection } from "@pureadmin/utils";
import {
  getSystemConfigList,
  updateSystemConfig,
  addSystemConfig,
  deleteSystemConfig,
  refreshSystemConfig
} from "@/api/system";
import { type Ref, reactive, ref, onMounted, h, toRaw } from "vue";

export function useConfig(treeRef: Ref) {
  const form = reactive({
    configName: "",
    configKey: "",
    configType: ""
  });
  const curRow = ref();
  const formRef = ref();
  const dataList = ref([]);
  const treeData = ref([]);
  const isShow = ref(false);
  const loading = ref(true);
  const isLinkage = ref(false);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "编号",
      prop: "configId"
    },
    {
      label: "参数名称",
      prop: "configName"
    },
    {
      label: "参数键名",
      prop: "configKey"
    },
    {
      label: "参数键值",
      prop: "configValue"
    },
    {
      label: "是否内置",
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.status == 1 ? "success" : null}
          effect="plain"
        >
          {row.status == 1 ? "否" : "是"}
        </el-tag>
      ),
      minWidth: 90
    },
    {
      label: "备注",
      prop: "remark",
      minWidth: 60
    },
    {
      label: "创建时间",
      prop: "createTime",
      minWidth: 120,
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 200,
      slot: "operation"
    }
  ];

  function handleDelete(row) {
    deleteSystemConfig([row.configId]).then(() => {
      message(`您删除了编号为${row.configId}的这条数据`, { type: "success" });
      onSearch();
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

  async function onSearch() {
    loading.value = true;
    const { data } = (await getSystemConfigList(toRaw(form))) as any;
    dataList.value = data.list;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}配置参数`,
      props: {
        formInline: {
          configId: row?.configId ?? "",
          configName: row?.configName ?? "",
          configKey: row?.configKey ?? "",
          configValue: row?.configValue ?? "",
          configType: row?.configType ?? "1",
          remark: row?.remark ?? ""
        }
      },
      width: "30%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了编号为${curData.configId}的这条数据`, {
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
              addSystemConfig(curData).then(() => {
                chores();
              });
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              updateSystemConfig(row.configId, curData).then(() => {
                chores();
              });
            }
          }
        });
      }
    });
  }

  /** 高亮当前权限选中行 */
  function rowStyle({ row: { configId } }) {
    return {
      cursor: "pointer",
      background:
        configId === curRow.value?.configId ? "var(--el-fill-color-light)" : ""
    };
  }

  const onQueryChanged = (query: string) => {
    treeRef.value!.filter(query);
  };

  const filterMethod = (query: string, node) => {
    return node.title!.includes(query);
  };

  onMounted(async () => {
    onSearch();
  });

  const refreshConfig = () => {
    refreshSystemConfig().then(() => {
      message(`刷新参数缓存成功`, {
        type: "success"
      });
    });
  };

  return {
    form,
    isShow,
    curRow,
    loading,
    columns,
    rowStyle,
    dataList,
    treeData,
    isLinkage,
    pagination,
    // buttonClass,
    onSearch,
    resetForm,
    openDialog,
    handleDelete,
    filterMethod,
    onQueryChanged,
    // handleDatabase,
    refreshConfig,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
