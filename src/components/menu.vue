<template>
  <el-menu :default-active="ac_index" class="el-menu-vertical-demo" router @select="handleSelect">
    <el-menu-item index="/allPaper">
      <el-icon>
        <Promotion />
      </el-icon>
      <span>帖子</span>
    </el-menu-item>
    <!-- <el-menu-item index="/carousel">
      <el-icon>
        <Picture />
      </el-icon>
      <span>轮播图</span>
    </el-menu-item> -->
    <el-menu-item index="/dustbin">
      <el-icon>
        <Delete />
      </el-icon>
      <span>回收站</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
onMounted(() => {
  if (JSON.parse(localStorage.getItem('ac_index'))) {
    ac_index.value = JSON.parse(localStorage.getItem('ac_index'));
    router.push(ac_index.value);
  } else {
    ac_index.value = '/allPaper';
    router.push(ac_index.value);
  }
});
const router = useRouter();
const ac_index = ref("/allPaper");
router.push(ac_index.value);
const handleSelect = (index) => {
  localStorage.setItem("ac_index", JSON.stringify(index));
  ac_index.value = index;
  router.push(index);
};
</script>

<style lang="scss" scoped></style>
