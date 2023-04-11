<template>
    <div class="block text-center" style="width: 705px;margin: 0 auto;">
        <span class="demonstration">现有轮播图</span>
        <el-carousel height="300px" v-if="carouselList.length > 0">
            <el-carousel-item v-for="item in carouselList" :key="item.id" @click="carouseliItemClick(item)">
                <el-image :src="item.picUrl" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup>
import { getcarouselList } from "~/api/manager";
import { ref, onBeforeMount } from "vue";
const carouseliItemClick = (item) => {
    console.log("点击轮播图", item);
}
const carouselList = ref([])
onBeforeMount(async () => {
    let { data: res } = await getcarouselList()
    carouselList.value = res.data
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
