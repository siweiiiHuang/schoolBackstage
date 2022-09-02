<template>
  <div>
    <el-card class="box-card">
      <el-row class="mb-4">
        <el-col :span="6" :xs="12">
          <el-input
            v-model="inputSearch"
            class=""
            placeholder="Type something"
            :prefix-icon="Search"
        /></el-col>
        <el-col :span="2" :xs="12" class="flex items-center justify-center">
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
      </el-row>
      <el-table :data="tableDataList[currentPage - 1]" style="width: 100%">
        <el-table-column prop="createTime" label="发布时间" width="120" />
        <el-table-column prop="type" label="类型" width="100" />
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
              :src="row.picUrl1"
              fit="cover"
              style="width: 50px; height: 50px"
              v-if="row.picUrl1"
              class="rounded-sm"
              :preview-teleported="true"
            />
            <el-image
              :src="row.picUrl2"
              fit="cover"
              style="width: 50px; height: 50px"
              v-if="row.picUrl2"
              class="rounded-sm"
              :preview-teleported="true"
            />
            <el-image
              :src="row.picUrl3"
              fit="cover"
              style="width: 50px; height: 50px"
              v-if="row.picUrl3"
              class="rounded-sm"
              :preview-teleported="true"
            />
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="270">
          <template #default="{ row }">
            <el-button type="success" @click="pass(row)">通过</el-button>
            <el-button type="danger">驳回</el-button>
            <el-button type="primary">置顶</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15]"
      layout="sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="mt-4"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getTableData,passPaper } from "~/api/manager";
import { Search } from "@element-plus/icons-vue";
let inputSearch = ref('')
let tableData = ref([]);
let tableDataList = ref([]);
let currentPage = ref(1);
let pageSize = ref(5);
let total = ref(0);
let imgSrcList = ref([]);
function handlePreview(file) {
  imgSrcList.value.push(file);
}
async function getData() {
  const res = await getTableData(0);
  tableData.value = res.data.data;
  total.value = tableData.value.length
  let pageNum = Math.ceil(tableData.value.length / pageSize.value);
  for (let i = 1; i < pageNum; i++) {
    tableDataList.value.push(tableData.value.splice(0, pageSize.value));
  }
  //console.log(tableData.value);
  tableDataList.value.push(tableData.value.splice(0, tableData.value.length));
  console.log(tableDataList.value.length);
}
getData();
async function pass(row) {
  let res = await passPaper(row.id, 2, 1); //2是通过，1是非置顶
  if (res.data.code == 10) {
    getCheckingNum(1, 0); //1是待审核，0是全部
    tableDataList.value = [];
    getData();
  }
}
function handleCurrentChange(val) {
  currentPage.value = val;
  console.log(currentPage.value);
}

function handleSizeChange(val) {
  pageSize.value = val;
  tableDataList.value = [];
  getData();
}
</script>

<style lang="scss" scoped></style>
