<template>
  <el-menu
    :default-active="ac_index"
    class="el-menu-vertical-demo"
    router
    @select="handleSelect"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Promotion /></el-icon>
        <span>审核</span>
      </template>
      <el-menu-item index="/checking">待审核</el-menu-item>
      <el-menu-item index="/allPaper">全部</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref,onMounted } from "vue";
import { useRouter } from "vue-router";
onMounted(() => {
  if (JSON.parse(localStorage.getItem('ac_index'))) {
    ac_index.value = JSON.parse(localStorage.getItem('ac_index'));
    router.push(ac_index.value);
  } else {
    ac_index.value = '/checking';
    router.push(ac_index.value);
  }
});
const router = useRouter();
const ac_index = ref("/checking");
router.push(ac_index.value);
const handleSelect = (index) => {
  localStorage.setItem("ac_index", JSON.stringify(index));
  ac_index.value = index;
  router.push(index);
};
</script>

<style lang="scss" scoped>
</style>
