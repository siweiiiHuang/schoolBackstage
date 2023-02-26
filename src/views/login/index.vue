<template>
  <div class="w-full min-h-screen flex justify-center items-center">
    <el-form :model="form" class="w-[250px]" :rules="rules" ref="formRef">
      <el-form-item label="账号" prop="phone">
        <el-input v-model="form.phone" @change="phoneChange" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" show-password />
      </el-form-item>
      <el-form-item>
        <el-form-item label="记住我">
          <el-switch v-model="form.remeber" />
        </el-form-item>
        <el-button type="primary" @click="onSubmit" class="w-[250px]"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref, onUpdated } from "vue";
import { login } from "~/api/manager";
import { toast } from '~/composables/util'
import { useRouter } from "vue-router";

const router = useRouter();

// do not use same name with ref
const form = reactive({
  phone: "",
  password: "",
  remeber: false,
});

const phoneChange = ()=>{
  console.log(form.phone);
}

const rules = reactive({
  phone: [{ required: true, message: "账号不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
});

const formRef = ref(null);

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      console.log("error submit!!");
      return false;
    }
    login(form.phone, form.password, form.remeber)
      .then((res) => {
        if (res.data.code === 10) {
          toast('登录成功');
          router.push("/");
        } else {
          toast('登录失败', 'error');
        }
      })
  });
};
</script>

<style lang="scss" scoped></style>
