<template>
  <el-form label-width="80px">
    <el-form-item label="username">
      <el-input v-model="formRef.username"></el-input>
    </el-form-item>

    <el-form-item label="password">
      <el-input v-model="formRef.password" show-password></el-input>
    </el-form-item>

    <el-button type="primary" @click="login">login</el-button>
  </el-form>

  {{ form }}
</template>

<script lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { ElMessage } from "element-plus";
  import axios from "axios";

  export default {
    name: "login",

    setup() {
      const router = useRouter();

      const formRef = ref({
        username: "",
        password: ""
      });

      async function login() {
        try {
          await axios.post("/api/auth/login", {
            user_name: formRef.value.username,
            password: formRef.value.password
          });
          ElMessage.success("success");
          router.push("/");
        } catch (error) {
          ElMessage.error(JSON.stringify(error.response.data.message));
        }
      }

      return {
        formRef,
        login
      };
    }
  };
</script>

<style lang="less" scoped></style>
