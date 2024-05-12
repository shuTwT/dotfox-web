<script setup lang="ts">
import userAvatar from "@/assets/user.jpg";
defineOptions({
  name: "Welcome"
});
</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-card class="page-header" :body-style="{ display: 'flex' }">
        <template #default>
          <el-avatar
            class="page-header__avatar"
            :src="userAvatar"
            size="large"
          />
          <div class="page-header__tips">
            <div class="page-header__tips-title">早上好</div>
            <div class="page-header__tips-description" />
          </div>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.page-header .page-header__avatar {
  margin-right: 20px;
}

.page-header .page-header__tips-title {
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 700;
  color: #3c4a54;
}

.page-header .page-header__tips-description {
  min-height: 20px;
  font-size: 14px;
  color: #808695;
}
</style>
