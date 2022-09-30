<template>
    <!-- <div>
      <el-card class="box-card">
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
          <el-table-column prop="" label="操作" width="270">
            <template #default="{ row,index }">
              <el-button type="success" @click="changeStatus(row.id,2,1,null,index)">通过</el-button>
              <el-button type="danger" @click="changeStatus(row.id,3,1,'驳回',index)">驳回</el-button>
              <el-button type="primary" @click="changeStatus(row.id,2,2,null,index)">置顶</el-button>
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
    </div> -->
  </template>
<script setup>
import { onMounted, ref } from "vue";
import { getComment } from "~/api/manager";
onMounted(async() => {
  let res = await getComment()
  console.log(res);
})
</script>
<style>
    
</style>