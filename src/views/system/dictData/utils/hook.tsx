import dayjs from "dayjs";
import { useRoute } from "vue-router";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps } from "./types";
import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection } from "@pureadmin/utils";
import {
  getSystemDictDataList,
  updateSystemDictData,
  addSystemDictData,
  deleteSystemDictData
} from "@/api/system";
import { type Ref, reactive, ref, onMounted, h, toRaw } from "vue";

export function useDictData(treeRef: Ref) {
  const form = reactive({
    dictLabel: "",
    dictType: "",
    status: ""
  });
  const route = useRoute();
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
      prop: "dictCode"
    },
    {
      label: "字典标签",
      prop: "dictLabel"
    },
    {
      label: "字典键值",
      prop: "dictValue"
    },
    {
      label: "字典排序",
      prop: "dictSort"
    },
    {
      label: "状态",
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.status == 1 ? "danger" : null}
          effect="plain"
        >
          {row.status == 1 ? "停用" : "正常"}
        </el-tag>
      ),
      minWidth: 90
    },
    {
      label: "备注",
      prop: "remark",
      minWidth: 160
    },
    {
      label: "创建时间",
      prop: "createTime",
      minWidth: 160,
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 210,
      slot: "operation"
    }
  ];

  function handleDelete(row) {
    deleteSystemDictData([row.dictId]).then(() => {
      message(`您删除了角色名称为${row.name}的这条数据`, { type: "success" });
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
    console.log(route.params);
    form.dictType = String(route.params.dictType);
    const { data } = (await getSystemDictDataList(toRaw(form))) as any;
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
      title: `${title}字典类型`,
      props: {
        formInline: {
          dictSort: row?.dictSort ?? 0,
          dictLabel: row?.dictLabel ?? "",
          dictValue: row?.dictValue ?? "",
          dictType: row?.dictType ?? String(route.params.dictType),
          status: row?.status ?? "0",
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
          message(`您${title}了编号为${curData.dictCode}的这条数据`, {
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
              addSystemDictData(curData).then(() => {
                chores();
              });
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              updateSystemDictData(row.dictCode, curData).then(() => {
                chores();
              });
            }
          }
        });
      }
    });
  }

  /** 高亮当前权限选中行 */
  function rowStyle({ row: { dictCode } }) {
    return {
      cursor: "pointer",
      background:
        dictCode === curRow.value?.dictCode ? "var(--el-fill-color-light)" : ""
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
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
