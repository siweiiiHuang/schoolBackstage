<template>
    <div>
        <el-card class="box-card" :xs="24">
            <el-row class="mb-4">
                <el-col :span="6" :xs="18">
                    <el-input v-model="inputSearch" class="" placeholder="Type something" :prefix-icon="Search"
                        @change="searchQuery(inputSearch)" />
                </el-col>
                <el-col :span="4" :xs="6" style="text-align: center;line-height: 40px;">
                    <el-dropdown style="margin-top: 7px;" @command="handleCommand">
                        <span class="el-dropdown-link">
                            分类
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="0">全部</el-dropdown-item>
                                <el-dropdown-item command="1">吐槽</el-dropdown-item>
                                <el-dropdown-item command="2">表白</el-dropdown-item>
                                <el-dropdown-item command="3">拼车</el-dropdown-item>
                                <el-dropdown-item command="4">跑腿</el-dropdown-item>
                                <el-dropdown-item command="5">闲置</el-dropdown-item>
                                <el-dropdown-item command="6">问问</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown></el-col>
            </el-row>
            <el-table :data="tableData" style="width: 100%" table-layout="auto">
                <el-table-column prop="createTime" label="发布时间" width="145" />
                <el-table-column prop="id" label="ID" width="80" />
                <el-table-column prop="typeInfo" label="类型" width="100" />
                <el-table-column label="头像" width="100">
                    <template #default="{ row }">
                        <el-image :src="row.authorProfile.avatarUrl" fit="cover" style="width: 50px; height: 50px"
                            :preview-src-list="imgSrcList" @click="handlePreview(row.authorProfile.avatarUrl)"
                            class="rounded-sm" :preview-teleported="true" />
                    </template>
                </el-table-column>
                <el-table-column prop="authorProfile.nickname" label="昵称" width="120" />
                <el-table-column prop="content" label="内容" width="350" />
                <el-table-column prop="" label="图片" width="175">
                    <template #default="{ row }">
                        <el-image :src="item" fit="cover" style="width: 50px; height: 50px;" v-for="item in row.picUrlList"
                            :preview-src-list="row.picUrlList" class="rounded-sm" :preview-teleported="true" />
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" width="180">
                    <template #default="{ row }">
                        <el-button type="success" @click="cancelDeletePaper(row.id)">取消删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" layout="prev, pager, next, jumper"
            :total="total" @current-change="handleCurrentChange" class="mt-4" />
        <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
            <span>{{ dialogMessage }}</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="onConfirmDialogVisible">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
  
<script setup>
import { selectAll, cancelDelPaper } from "~/api/manager";
import { ref, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";

//对话框可见值
const dialogVisible = ref(false)
//搜索框输入值
let inputSearch = ref("");
//表格数据
let tableData = ref([]);
//当前页
let currentPage = ref(1);
//每页条数
let pageSize = ref(20);
//图片列表
let imgSrcList = ref([]);
//帖子总数
let total = ref(0);
//帖子规则
let match = [{
    "column": "status",
    "value": "4",
    "rule": 'eq'
}]
let order = [{
    "column": "id",
    "asc": false
}]
//dialog文本
let dialogMessage = ref('')
//切换分类
const handleCommand = async (command) => {
    match = [{
        "column": "type",
        "value": command,
        "rule": 'eq'
    }, {
        "column": "status",
        "value": "4",
        "rule": 'eq'
    }]
    await selectAllPaper(currentPage.value, pageSize.value, order, match);
}
onMounted(async () => {
    await selectAllPaper(currentPage.value, pageSize.value, order, match);
});

//查询纸条
async function selectAllPaper(current, size, order, match) {
    let res = await selectAll(current, size, order, match);
    total.value = res.data.data.total
    tableData.value = res.data.data.records.map((item) => {
        item.pinned = item.pinned === 1 ? false : true
        console.log(item.pinned);
        return item
    })
}
//预览图片
function handlePreview(file) {
    imgSrcList.value = [];
    imgSrcList.value.push(file);
}

//切换当前页
function handleCurrentChange(val) {
    match = [{
        "column": "status",
        "value": 4,
        "rule": 'eq'
    }]
    currentPage.value = val;
    selectAllPaper(currentPage.value, pageSize.value, order, match);
}

//搜索实现模糊查询
const searchQuery = async (val) => {
    console.log(val);
    match = [{
        "column": "content",
        "value": val,
        "rule": 'like'
    }]
    if (val == '') {
        match = [{
            "column": "status",
            "value": 4,
            "rule": 'eq'
        }]
    }
    await selectAllPaper(currentPage.value, pageSize.value, order, match);
}

//取消删除id
let cancelDeleteID = null

//对话框点击确认
const onConfirmDialogVisible = async () => {
    await cancelDelPaper(cancelDeleteID, 2)
    dialogVisible.value = false
    match = [{
        "column": "status",
        "value": "4",
        "rule": 'eq'
    }]
    await selectAllPaper(currentPage.value, pageSize.value, order, match);
}
//取消删除
const cancelDeletePaper = (id) => {
    dialogVisible.value = true
    dialogMessage.value = '你确定要把这条纸条恢复吗？'
    cancelDeleteID = id
}
</script>
  
<style lang="scss" scoped></style>