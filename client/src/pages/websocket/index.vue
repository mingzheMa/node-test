<template>
  <el-button @click="createConnect">createConnect</el-button>
  <el-button @click="postMessage">postMessage</el-button>
  <el-button @click="closeConnect">closeConnect</el-button>
</template>

<script lang="ts">
  import { ref } from "vue";

  export default {
    name: "websocket",

    setup() {
      const ioRef = ref(undefined);

      // websocket open
      function open(e) {
        console.log("io is open", e);
      }

      // websocket error
      function error(e) {
        console.log("connect is error", e);
      }

      // websocket message
      function message(e) {
        console.log("message from server", e);
      }

      // 建立websocket
      function createConnect() {
        ioRef.value = new WebSocket("ws://localhost:9527");
        ioRef.value.addEventListener("open", open);
        ioRef.value.addEventListener("error", error);
        ioRef.value.addEventListener("message", message);
      }

      // websocket发送消息
      function postMessage() {
        ioRef.value.send(`message from client ${new Date()}`);
      }

      // 关闭websocket
      function closeConnect() {
        ioRef.value.close(1000, "client close websocket");
        ioRef.value = undefined;
      }

      return { createConnect, postMessage, closeConnect };
    }
  };
</script>

<style lang="less" scoped></style>
