import {
  projectListApi,
  changeProjectReleaseApi,
  deleteProjectApi
} from "@/api/datav/datavScreen";
import { message } from "@/utils/message";
import type { PaginationProps } from "@pureadmin/table";
import { onMounted, reactive, ref, toRaw } from "vue";
// import { FormItemProps } from "./types";
import { ElMessageBox } from "element-plus";

const goviewDeployUrl = "/goview/";

export function useDatavScreenList() {
  const form = reactive({
    name: "",
    category: ""
  });
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  async function onSearch() {
    loading.value = true;
    const { data, count } = await projectListApi(toRaw(form));
    dataList.value = data;
    pagination.total = count;
    // pagination.pageSize = data.pageSize;
    // pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };
  function openDialog(/**title = "新增", row?: FormItemProps*/) {}
  function confirmDelete(row) {
    ElMessageBox.confirm("确认删除吗", "提示").then(() => {
      deleteProjectApi({
        ids: row.id
      }).then(res => {
        if (res.code == 200) {
          message(`删除成功`, {
            type: "success"
          });
          onSearch(); // 刷新表格数据
        }
      });
    });
  }
  function handleEdit(row) {
    window.open(goviewDeployUrl + "#/chart/home/" + row.id);
  }
  function handleDelete(row) {
    confirmDelete(row);
  }
  function handlePreview(row) {
    window.open(goviewDeployUrl + "#/chart/preview/" + row.id);
  }
  function handlePublish(row) {
    if (row.state == -1) {
      changeProjectReleaseApi({ id: row.id, state: 1 }).then(res => {
        if (res.code == 200) {
          message("发布成功", { type: "success" });
        }
        onSearch();
      });
    } else {
      changeProjectReleaseApi({ id: row.id, state: -1 }).then(res => {
        if (res.code == 200) {
          message("取消发布成功", { type: "success" });
        }
        onSearch();
      });
    }
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
    formRef,
    dataList,
    loading,
    pagination,
    onSearch,
    resetForm,
    openDialog,
    handleEdit,
    handleDelete,
    handlePreview,
    handlePublish,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
