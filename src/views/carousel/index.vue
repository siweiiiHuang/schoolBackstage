<template>
    <div class="block text-center" style="width: 705px;margin: 0 auto;">
        <el-carousel height="300px" v-if="carouselList.length > 0">
            <el-carousel-item v-for="item in carouselList" :key="item.id" @click="carouseliItemClick(item)">
                <el-image :src="item.picUrl" />
                <div style="position: fixed;right: 10px;top: 10px;">
                    <el-button type="primary" :icon="Edit" circle @click="editCarousel(item)" />
                    <el-button type="danger" :icon="Delete" circle @click="delCarousel(item)" />
                </div>
            </el-carousel-item>
            <el-carousel-item @click="dialogVisible = true"
                style="display: flex;align-items: center;justify-content: center;">
                <el-button type="primary" size="large">+</el-button>
            </el-carousel-item>
        </el-carousel>
        <el-dialog v-model="dialogVisible" title="增加轮播图" width="30%" :before-close="handleClose">
            <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
                <el-form-item label="轮播图名称" prop="name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="图片链接" prop="picUrl">
                    <el-input v-model="form.picUrl" />
                </el-form-item>
                <el-form-item label="跳转链接" prop="jumpToUrl">
                    <el-input v-model="form.jumpToUrl" />
                </el-form-item>
                <el-form-item label="排序序号" prop="orderNum">
                    <el-input v-model="form.orderNum" placeholder="输入多少则排在第几位，从1开始" />
                </el-form-item>
                <el-form-item label="appid">
                    <el-input v-model="form.appid" placeholder="非跳转小程序可以不填" />
                </el-form-item>
                <el-form-item label="链接类型" prop="type">
                    <el-select v-model="form.type">
                        <el-option label="推文" value="tweet" />
                        <el-option label="小程序" value="miniprogram" />
                        <el-option label="h5链接" value="h5" />
                    </el-select>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="onSubmit">添加</el-button>
        </el-dialog>
    </div>
</template>

<script setup>
import { getcarouselList, addCarousel, delCarouselByID } from "~/api/manager";
import { ref, onBeforeMount, reactive } from "vue";
import { ElMessageBox } from 'element-plus'
import { Edit, Delete } from '@element-plus/icons-vue'
const dialogVisible = ref(false)
const carouseliItemClick = (item) => {
    console.log("点击轮播图", item);
}
const formRef = ref(null);
const carouselList = ref([])
onBeforeMount(async () => {
    let { data: res } = await getcarouselList()
    carouselList.value = res.data
});
const form = reactive({
    name: '',
    orderNum: '',
    picUrl: '',
    jumpToUrl: '',
    appid: null,
    type: ''
})
const rules = reactive({
    name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
    orderNum: [{ required: true, message: "排序不能为空", trigger: "blur" }],
    picUrl: [{ required: true, message: "图片链接不能为空", trigger: "blur" }],
    jumpToUrl: [{ required: true, message: "跳转链接不能为空", trigger: "blur" }],
    type: [{ required: true, message: "类型不能为空", trigger: "blur" }],
});

const handleClose = () => {
    ElMessageBox.confirm('关闭后不保存已填信息，请问是否确认关闭?')
        .then(() => {
            dialogVisible.value = false
            form.name = ''
            form.orderNum = ''
            form.picUrl = ''
            form.jumpToUrl = ''
            form.appid = null
            form.type = ''
        })
        .catch(() => {
            // catch error
            console.log('取消关闭增加轮播图表单对话框');
        })
}

const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            ElMessage({
                message: '请把相关的信息填写完整！',
                type: 'warning',
            })
            return false;
        }
        form.orderNum = parseInt(form.orderNum);
        addCarousel(form)
    });
};

const delCarousel = (item) => {
    ElMessageBox.confirm('是否确认删除该轮播图?')
        .then(async () => {
            delCarouselByID(item.id)
            let { data: res } = await getcarouselList()
            carouselList.value = res.data
            ElMessage({
                message: '删除成功！',
                type: 'success',
            })
        })
        .catch(() => {
            // catch error
            console.log('取消删除轮播图');
        })
}
</script>

<style scoped>
.demonstration {
    color: var(--el-text-color-secondary);
    font-size: 22px;
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
