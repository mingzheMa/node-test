<template>
  {{ dataRef }}
  <input type="file" accept="image/*" @change="upload" />
  {{ imgUploadProgressRef }}%
  <img :src="imgInfoRef.url" alt="" />

  <button @click="download">download</button>

  {{ imgInfoRef }}
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
      const imgInfoRef = ref({
        url: "",
        filename: ""
      });
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
        imgInfoRef.value = res.data;
      }

      // 下载文件
      function download() {
        // const downloadUrl = "/api/file/download/wuyanzu.zip";
        // location.href = downloadUrl

        // 迅雷协议下载,如果使用迅雷下载，不要再服务端做权限校验
        // const downloadUrl =
        //   "http://127.0.0.1:9527/api/file/download/wuyanzu.zip";
        // let thunderLink = `AA${downloadUrl}ZZ`;
        // thunderLink = btoa(thunderLink);
        // thunderLink = `thunder://${thunderLink}`;
        // location.href = thunderLink;

        // 下载上传的图片
        if (imgInfoRef.value.filename) {
          const downloadUrl = `/api/file/download/img/${imgInfoRef.value.filename}`;
          location.href = downloadUrl;
        }
      }

      return {
        dataRef,
        upload,
        imgInfoRef,
        imgUploadProgressRef,
        download
      };
    }
  };
</script>

<style lang="less" scoped></style>
