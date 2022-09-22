<template>
  <div>
    <el-card class="box-card">
      <el-row class="mb-4">
        <el-col :span="6" :xs="24">
          <el-input
            v-model="inputSearch"
            class=""
            placeholder="Type something"
            :prefix-icon="Search"
        /></el-col>
        <el-col
          :span="4"
          :xs="6"
          class="flex items-center justify-center w-full"
        >
          <el-dropdown>
            <span class="el-dropdown-link">
              分类
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>吐槽</el-dropdown-item>
                <el-dropdown-item>表白</el-dropdown-item>
                <el-dropdown-item>拼车</el-dropdown-item>
                <el-dropdown-item>跑腿</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown></el-col
        >
        <!-- <el-col :span="14" :xs="24">
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate">
              全部
            </el-checkbox>
            <el-checkbox
              v-for="status in statuses"
              :key="status"
              :label="status"
              >{{ status }}
            </el-checkbox>
          </el-checkbox-group>
        </el-col> -->
      </el-row>
      <el-table :data="tableData" style="width: 100%" table-layout="auto">
        <el-table-column prop="createTime" label="发布时间" width="120" />
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="typeInfo" label="类型" width="100" />
        <el-table-column label="头像" width="100">
          <template #default="{ row }">
            <el-image
              :src="row.authorProfile.avatarUrl"
              fit="cover"
              style="width: 50px; height: 50px"
              :preview-src-list="imgSrcList"
              @click="handlePreview(row.authorProfile.avatarUrl)"
              class="rounded-sm"
              :preview-teleported="true"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="authorProfile.nickname"
          label="昵称"
          width="120"
        />
        <el-table-column prop="content" label="内容" width="350" />
        <el-table-column prop="" label="图片" width="210">
          <template #default="{ row }">
            <el-image
              :src="item"
              fit="cover"
              style="width: 50px; height: 50px;"
              v-for="item in row.picUrlList"
              :preview-src-list="row.picUrlList"
              class="rounded-sm"
              :preview-teleported="true"
            />
          </template>
        </el-table-column>
        <el-table-column prop="" label="状态" width="360">
          <template #default="{ row }">
            <el-button
              type="success"
              :disabled="row.disabledList[0]"
              @click="changeStatus(row.id, 2, 1,null)"
              >{{ row.statusList[0] }}</el-button
            >
            <el-button type="warning" :disabled="row.disabledList[1]" @click="changeStatus(row.id, 3,1,'驳回')">{{
              row.statusList[1]
            }}</el-button>
            <el-button type="primary" plain @click="changeStatus(row.id,2,(row.pinned == 2)?1:2,null)">{{
              row.statusList[2]
            }}</el-button>
            <el-button type="danger" :disabled="row.disabledList[3]" @click="changeStatus(row.id, 4,1,null)">{{
              row.statusList[3]
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="total"
      @current-change="handleCurrentChange"
      class="mt-4"
    />
  </div>
</template>

<script setup>
import { selectAll, getAllPaperNumber, changePaperStatus } from "~/api/manager";
import { ref, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
let inputSearch = ref("");
let tableData = ref([]);
let currentPage = ref(1);
let pageSize = ref(20);
let imgSrcList = ref([]);
let total = ref(0);
onMounted(() => {
  getPaperNumber(0, "2022-07-30");
  selectAllPaper(currentPage.value);
});
async function getPaperNumber(type, sinceDate) {
  let res = await getAllPaperNumber(type, sinceDate);
  total.value = res.data.data
}
//查询当前选择页的纸条
async function selectAllPaper(currentPage) {
  let res = await selectAll(currentPage);
  tableData.value = res.data.data;
  for (const val of tableData.value) {
    if (val.status == 1) {
      val.statusList = ["通过", "驳回", "置顶", "删除"];
      val.disabledList = [false, false, false, false];
    } else if (val.status == 2) {
      if (val.pinned == 1) {
        val.statusList = ["已通过", "驳回", "置顶", "删除"];
        val.disabledList = [true, false, false, false];
      } else {
        val.statusList = ["已通过", "驳回", "取消置顶", "删除"];
        val.disabledList = [true, false, false, false];
      }
    } else if (val.status == 3) {
      val.statusList = ["通过", "已驳回", "置顶", "删除"];
      val.disabledList = [false, true, false, false];
    } else if (val.status == 4) {
      val.statusList = ["通过", "驳回", "置顶", "已删除"];
      val.disabledList = [false, false, false, true];
    }
  }
}
function handlePreview(file) {
  imgSrcList.value = [];
  imgSrcList.value.push(file);
}
function handleCurrentChange(val) {
  currentPage.value = val;
  selectAllPaper(currentPage.value);
}

async function changeStatus(id, status, pinned,statusInfo) {
  await changePaperStatus(id, status, pinned,statusInfo);
  selectAllPaper(currentPage.value);
}
</script>

<style lang="scss" scoped></style>
