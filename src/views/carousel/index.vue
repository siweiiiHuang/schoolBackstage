<template>
    <div class="block text-center" style="width: 705px;margin: 0 auto;">
        <span class="demonstration">现有轮播图</span>
        <el-carousel height="300px">
            <el-carousel-item v-for="item in 4" :key="item" @click="carouseliItemClick(item)">
                <h3 class="small justify-center" text="2xl">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
        <div style="width: 200px;text-overflow: ellipsis;overflow:hidden;white-space:nowrap;"><text user-select>侵华日军蔷薇科蔷薇看了呃呃呃呃呃呃呃呃恶趣味去问驱蚊器委屈委屈问问去恶气委屈为我去饿我去额前恶趣味请问请问请问请问额前问问去额委屈委屈委屈委屈委屈委屈我</text>></div>
    </div>
</template>

<script setup>
const carouseliItemClick = (item)=>{
    console.log("点击轮播图",item);
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
