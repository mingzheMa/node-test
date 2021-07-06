<template>
  <el-form label-width="80px" style="margin-bottom: 20px">
    <el-form-item label="nick name">
      <el-input v-model="formRef.nickname"></el-input>
    </el-form-item>

    <el-form-item label="user name">
      <el-input v-model="formRef.username"></el-input>
    </el-form-item>

    <el-form-item label="password">
      <el-input v-model="formRef.password" show-password></el-input>
    </el-form-item>

    <el-form-item label="captcha">
      <el-input v-model="formRef.captcha"></el-input>
      <img
        :src="captchaSrcRef"
        alt=""
        :style="{ width: '160px', height: '100px' }"
        @click="resetCaptchaSrc"
      />
    </el-form-item>

    <el-button type="primary" @click="register">register</el-button>
  </el-form>

  <router-link to="/login">to login ></router-link>
</template>

<script lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { ElMessage } from "element-plus";
  import axios from "axios";

  export default {
    name: "register",

    setup() {
      const router = useRouter();

      const formRef = ref({
        username: "",
        nickname: "",
        password: "",
        captcha: ""
      });

      async function register() {
        try {
          await axios.post("/api/auth/register", {
            user_name: formRef.value.username,
            nick_name: formRef.value.nickname,
            password: formRef.value.password,
            captcha: formRef.value.captcha
          });
          ElMessage.success("register success");
          router.push("/login");
        } catch (error) {
          ElMessage.error(JSON.stringify(error.response.data.message));
        }

        resetCaptchaSrc();
      }

      const captchaSrcRef = ref("/captcha");

      function resetCaptchaSrc() {
        captchaSrcRef.value = `/captcha?reset=${Math.random()}`;
      }

      return {
        formRef,
        register,
        captchaSrcRef,
        resetCaptchaSrc
      };
    }
  };
</script>

<style lang="less" scoped></style>
