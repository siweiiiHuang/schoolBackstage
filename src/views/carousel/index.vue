<template>
    <div class="block text-center" style="width: 705px;margin: 0 auto;">
        <span class="demonstration">现有轮播图</span>
        <el-carousel height="300px" v-if="carouselList.length > 0">
            <el-carousel-item v-for="item in carouselList" :key="item.id" @click="carouseliItemClick(item)">
                <el-image :src="item.picUrl" />
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
                    <el-input v-model="form.picUrl" placeholder="输入多少则排在第几位，从1开始" />
                </el-form-item>
                <el-form-item label="跳转链接" prop="jumpToUrl">
                    <el-input v-model="form.jumpToUrl" />
                </el-form-item>
                <el-form-item label="轮播图排序序号" prop="orderNum">
                    <el-input v-model="form.orderNum" />
                </el-form-item>
                <el-form-item label="appid">
                    <el-input v-model="form.name" placeholder="没有可以不填" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">添加</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup>
import { getcarouselList } from "~/api/manager";
import { ref, onBeforeMount, reactive } from "vue";
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
    appid: '',
})
const rules = reactive({
    name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
    orderNum: [{ required: true, message: "排序不能为空", trigger: "blur" }],
    picUrl: [{ required: true, message: "图片链接不能为空", trigger: "blur" }],
    jumpToUrl: [{ required: true, message: "跳转链接不能为空", trigger: "blur" }],
});
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
