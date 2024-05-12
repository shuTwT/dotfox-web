<script setup lang="ts">
import { getDbList } from "@/api/tool";
import type { PaginationProps } from "@pureadmin/table";
import { ref, reactive } from "vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { FormProps } from "../utils/types";
import Refresh from "@iconify-icons/ep/refresh";
import { onMounted } from "vue";
import { toRaw } from "vue";

const formInline = reactive({
  tableName: "",
  tableComment: ""
});

const selections = ref([]);

const dataList = ref([]);
const pagination = reactive<PaginationProps>({
  total: 0,
  pageSize: 10,
  currentPage: 1,
  background: true
});
const ruleFormRef = ref();

function getRef() {
  return ruleFormRef.value;
}

function getSelections() {
  return selections.value.map(item => item.table_name);
}

function onSearch() {
  getDbList({
    ...toRaw(formInline),
    pageNum: pagination.currentPage,
    pageSize: pagination.pageSize
  }).then(res => {
    dataList.value = res.data.list;
    pagination.total = res.data.total;
  });
}
function resetForm() {}

function handleCurrentChange(val: number) {
  onSearch();
}
function handleSelectChange(selection: any[]) {
  const arr = selection.map(item => toRaw(item));
  selections.value = arr;
}
onMounted(() => {
  onSearch();
});

defineExpose({ getRef, getSelections });
</script>

<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :inline="true"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto"
    >
      <el-form-item label="表名称">
        <el-input v-model="formInline.tableName" placeholder="请输入表名称" />
      </el-form-item>
      <el-form-item label="表描述">
        <el-input
          v-model="formInline.tableComment"
          placeholder="请输入表描述"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon('ri:search-line')"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      style="height: 250px"
      @selection-change="handleSelectChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="表名称" prop="table_name" />
      <el-table-column label="表描述" prop="table_comment" />
      <el-table-column label="创建时间" prop="create_time" />
      <el-table-column label="更新时间" prop="update_time" />
    </el-table>
    <el-pagination
      v-model:current-page="pagination.currentPage"
      background
      layout="prev,pager,next"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      style="
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        margin: 16px 0;
      "
      @current-change="handleCurrentChange"
    />
  </div>
</template>
