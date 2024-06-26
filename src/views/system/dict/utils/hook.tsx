import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps } from "./types";
import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection, isEmpty, isString } from "@pureadmin/utils";
import {
  getSystemDictTypeList,
  updateSystemDictType,
  addSystemDictType,
  deleteSystemDictType
} from "@/api/system";
import { reactive, ref, onMounted, h, toRaw } from "vue";
import {
  type LocationQueryRaw,
  type RouteParamsRaw,
  useRoute,
  useRouter
} from "vue-router";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";

export function useDictType() {
  const route = useRoute();
  const router = useRouter();
  const getParameter = isEmpty(route.params) ? route.query : route.params;
  const form = reactive({
    dictName: "",
    dictType: "",
    status: ""
  });
  const curRow = ref();
  const formRef = ref();
  const dataList = ref([]);
  const isShow = ref(false);
  const loading = ref(true);
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
          to={"/system/dict-data/" + row.dictType}
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
          type={row.status == 0 ? "danger" : null}
          effect="plain"
        >
          {row.status == 0 ? "关闭" : "正常"}
        </el-tag>
      ),
      width: 90
    },
    {
      label: "备注",
      prop: "remark",
      width: 160
    },
    {
      label: "创建时间",
      prop: "createTime",
      width: 160,
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
      message(`您删除了字典名称为${row.name}的这条数据`, { type: "success" });
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

  function toDetail(
    parameter: LocationQueryRaw | RouteParamsRaw,
    model: "query" | "params"
  ) {
    // ⚠️ 这里要特别注意下，因为vue-router在解析路由参数的时候会自动转化成字符串类型，比如在使用useRoute().route.query或useRoute().route.params时，得到的参数都是字符串类型
    // 所以在传参的时候，如果参数是数字类型，就需要在此处 toString() 一下，保证传参跟路由参数类型一致都是字符串，这是必不可少的环节！！！
    Object.keys(parameter).forEach(param => {
      if (!isString(parameter[param])) {
        parameter[param] = parameter[param].toString();
      }
    });
    if (model === "query") {
      // 保存信息到标签页
      useMultiTagsStoreHook().handleTags("push", {
        path: `/system/dict-data`,
        name: "SystemDictData",
        query: parameter,
        meta: {
          title: `字典数据`,
          // 如果使用的是非国际化精简版title可以像下面这么写
          // title: `No.${index} - 详情信息`,
          // 最大打开标签数
          dynamicLevel: 3
        }
      });
      // 路由跳转
      router.push({ name: "SystemDictData", query: parameter });
    } else if (model === "params") {
      useMultiTagsStoreHook().handleTags("push", {
        path: `/system/dict-data/:id`,
        name: "SystemDictData",
        params: parameter,
        meta: {
          title: `字典数据`
          // 如果使用的是非国际化精简版title可以像下面这么写
          // title: `No.${index} - 详情信息`,
        }
      });
      router.push({ name: "SystemDictData", params: parameter });
    }
  }

  // 用于页面刷新，重新获取浏览器地址栏参数并保存到标签页
  const initToDetail = (model: "query" | "params") => {
    if (getParameter) toDetail(getParameter, model);
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
    pagination,
    toDetail,
    initToDetail,
    onSearch,
    resetForm,
    openDialog,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
