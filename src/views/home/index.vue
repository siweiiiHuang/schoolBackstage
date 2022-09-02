<template>
  <Header />
  <el-row>
    <el-col :lg="3" :md="4" class="">
      <Menu />
    </el-col>
    <el-col :lg="21" :md="20">
      <div class="ml-2 mr-2"><router-view /></div>
    </el-col>
  </el-row>
</template>

<script setup>
import Menu from "../../components/menu.vue";
import Header from "../../components/header.vue";
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
</style>
