import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps } from "./types";
import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection } from "@pureadmin/utils";
import {
  getSystemDictTypeList,
  updateSystemDictType,
  addSystemDictType,
  deleteSystemDictType
} from "@/api/system";
import { type Ref, reactive, ref, onMounted, h, toRaw } from "vue";

export function useDictType(treeRef: Ref) {
  const form = reactive({
    dictName: "",
    dictType: "",
    status: ""
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
      prop: "dictId"
    },
    {
      label: "字典名称",
      prop: "dictName"
    },
    {
      label: "类型",
      cellRenderer: ({ row }) => (
        <router-link
          to={"/system/dict-data/index/" + row.dictType}
          class="link-type text-[#337ab7] hover:text-[#20a0ff] focus:text-[#337ab7] focus:hover:text-[#20a0ff]"
        >
          <span>{row.dictType}</span>
        </router-link>
      )
    },
    {
      label: "状态",
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.status == 1 ? "danger" : null}
          effect="plain"
        >
          {row.status == 1 ? "关闭" : "正常"}
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
    deleteSystemDictType([row.dictId]).then(() => {
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
    const { data } = (await getSystemDictTypeList(toRaw(form))) as any;
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
          dictId: row?.dictId ?? "",
          dictName: row?.dictName ?? "",
          dictType: row?.dictType ?? "",
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
          message(`您${title}了编号为${curData.dictId}的这条数据`, {
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
              addSystemDictType(curData).then(() => {
                chores();
              });
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              updateSystemDictType(row.dictId, curData).then(() => {
                chores();
              });
            }
          }
        });
      }
    });
  }

  /** 高亮当前权限选中行 */
  function rowStyle({ row: { dictId } }) {
    return {
      cursor: "pointer",
      background:
        dictId === curRow.value?.dictId ? "var(--el-fill-color-light)" : ""
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
