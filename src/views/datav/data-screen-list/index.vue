<script setup lang="ts">
import { useDatavScreenList } from "./utils/hook";
import {
  delay,
  subBefore,
  deviceDetection,
  useResizeObserver
} from "@pureadmin/utils";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Refresh from "@iconify-icons/ep/refresh";
import Menu from "@iconify-icons/ep/menu";
import AddFill from "@iconify-icons/ri/add-circle-line";
import Close from "@iconify-icons/ep/close";
import Check from "@iconify-icons/ep/check";
import MoreFilled from "@iconify-icons/ep/more-filled";
const {
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
} = useDatavScreenList();
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto"
    >
      <el-form-item label="大屏类型：" prop="category">
        <el-input
          v-model="form.category"
          placeholder="请输入大屏类型"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="大屏名称：" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入大屏名称"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon('ri:search-line')"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <div
      ref="contentRef"
      :class="['flex', deviceDetection() ? 'flex-wrap' : '']"
    >
      <PureTableBar
        class="w-full"
        style="transition: width 220ms cubic-bezier(0.4, 0, 0.2, 1)"
        title="大屏管理"
        @refresh="onSearch"
      >
        <template #buttons>
          <el-button
            type="primary"
            :icon="useRenderIcon(AddFill)"
            @click="openDialog()"
          >
            新增大屏
          </el-button>
        </template>
        <template #default>
          <div class="screen-table">
            <ElRow>
              <ElCol
                v-for="(item, index) in dataList"
                :key="index"
                :span="24"
                :xl="4"
                :lg="6"
                :md="8"
                :sm="12"
              >
                <ElCard>
                  <div class="content-img">
                    <ElImage
                      class="image"
                      :src="item.indexImage"
                      alt="background"
                    />
                  </div>
                  <div class="card-action">
                    <span
                      class="overflow-hidden text-ellipsis whitespace-nowrap break-all"
                      >{{ item.projectName }}</span
                    >
                    <div class="flex items-center text-center justify-end">
                      <div class="flex flex-wrap justify-start gap-x-2 gap-y-3">
                        <div class="flex items-center">
                          <span>
                            <ElBadge
                              :type="item.state == -1 ? 'danger' : 'success'"
                              is-dot
                            />
                            {{ item.state == -1 ? "未发布" : "已发布" }}
                          </span>
                        </div>
                        <div>
                          <ElButton @click="handleEdit(item)">编辑</ElButton>
                        </div>
                        <div>
                          <ElDropdown>
                            <ElButton>
                              <IconifyIconOffline :icon="MoreFilled" />
                            </ElButton>
                            <template #dropdown>
                              <el-dropdown-menu>
                                <el-dropdown-item @click="handlePreview(item)">
                                  预览
                                </el-dropdown-item>
                                <el-dropdown-item @click="handlePublish(item)">
                                  取消发布
                                </el-dropdown-item>
                                <el-dropdown-item @click="handleDelete(item)">
                                  删除
                                </el-dropdown-item>
                              </el-dropdown-menu>
                            </template>
                          </ElDropdown>
                        </div>
                      </div>
                    </div>
                  </div>
                </ElCard>
              </ElCol>
            </ElRow>
          </div>
          <ElPagination
            background
            layout="prev, pager, next,sizes,jumper"
            :total="pagination.total"
            :page-size="pagination.pageSize"
            :current-page="pagination.currentPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </template>
      </PureTableBar>
    </div>
  </div>
</template>

<style scoped>
.el-pagination {
  justify-content: center;
}

.el-badge {
  width: 10px;
  height: 10px;
  margin-bottom: 8px;
}

.el-image {
  width: 100%;
  height: 180px;
}

.content-img {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  overflow: hidden;
  text-align: center;
  border-radius: 8px;
}

.card-action {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
}
</style>
