<template>
  {{ dataRef }}
  <input type="file" accept="image/*" @change="upload" />
  {{ imgUploadProgressRef }}%
  <img :src="imgUrlRef" alt="" />
</template>

<script lang="ts">
  import { ref } from "vue";
  import axios from "axios";

  export default {
    name: "index",

    setup() {
      //  获取数据
      const dataRef = ref([]);

      axios
        .get("/api/admin", {
          params: {
            page: 1,
            limit: 10
          }
        })
        .then(res => {
          dataRef.value = res.data.rows;
        });

      // 上传文件
      const imgUploadProgressRef = ref(0);
      const imgUrlRef = ref("");
      async function upload(e) {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        const res = await axios.post("/api/file/upload/img", formData, {
          onUploadProgress({ loaded, total }) {
            const num = loaded / total;
            if (typeof num === "number") {
              imgUploadProgressRef.value = parseInt(num * 100);
            }
          }
        });
        e.target.value = "";
        imgUploadProgressRef.value = 0;
        imgUrlRef.value = res.data.url;
      }

      return {
        dataRef,
        upload,
        imgUrlRef,
        imgUploadProgressRef
      };
    }
  };
</script>

<style lang="less" scoped></style>
