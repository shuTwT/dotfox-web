import {
  projectListApi,
  changeProjectReleaseApi,
  deleteProjectApi,
  createProjectApi
} from "@/api/datav/datavScreen";
import { message } from "@/utils/message";
import type { PaginationProps } from "@pureadmin/table";
import { h, onMounted, reactive, ref, toRaw } from "vue";
import { ElMessageBox } from "element-plus";
import type { FormItemProps } from "./types";
import { deviceDetection } from "@pureadmin/utils";
import { addDialog } from "@/components/ReDialog";
import editForm from "../form.vue";

const goviewDeployUrl = "/goview/";

export function useDatavScreenList() {
  const form = reactive({
    projectName: "",
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
  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}大屏`,
      props: {
        formInline: {
          projectName: row?.projectName ?? ""
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
          message(`您${title}了角色名称为${curData.projectName}的这条数据`, {
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
              createProjectApi(curData).then(() => {
                // 实际开发先调用新增接口，再进行下面操作
                chores();
              });
            } else {
            }
          }
        });
      }
    });
  }
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
