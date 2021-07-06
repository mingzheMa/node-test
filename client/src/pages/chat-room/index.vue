<template>
  <el-row :gutter="16">
    <el-col :span="6" class="user-box">
      <template v-for="user in userListRef" :key="user.info.id">
        <div>{{ user.info.user_name }}</div>
      </template>
    </el-col>

    <el-col :span="18" class="msg-box">
      <div class="msg-list" ref="msgListDomRef">
        <template v-for="msg in msgListRef" :key="msg.msg_id">
          <div v-if="msg.msg_type === 'USER'" class="msg-li">
            <div class="msg-info">{{ msg.user }}:</div>
            <div>
              <span class="msg-body">{{ msg.msg }}</span>
            </div>
          </div>

          <div v-else-if="msg.msg_type === 'SELF'" class="msg-li msg-li--self">
            <div class="msg-info">:{{ msg.user }}</div>
            <div>
              <span class="msg-body">{{ msg.msg }}</span>
            </div>
          </div>

          <div v-else-if="msg.msg_type === 'NOTICE'" class="msg-li--notice">
            <div class="msg-body--notice">tips:{{ msg.msg }}</div>
          </div>
        </template>
      </div>

      <div class="msg-footer">
        <el-input
          v-model="msgRef"
          placeholder="message..."
          @keyup.enter.native="sendMsg"
        />
        <el-button @click="sendMsg">send</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
  import { ref, onBeforeUnmount } from "vue";
  import { io } from "socket.io-client";

  import msgCom from "./composition/msg";
  import userCom from "./composition/user";

  export default {
    name: "chat-room",

    setup() {
      const socket = io("ws://localhost:9527/");

      const msg = msgCom(socket);
      const user = userCom(socket, msg);

      // 用户进入
      user.userin();

      onBeforeUnmount(() => {
        // 用户退出
        user.userout();
      });

      return {
        ...msg,
        ...user
      };
    }
  };
</script>

<style lang="scss" scoped>
  .user {
    &-box {
      height: calc(100vh - 22px);
      overflow-y: auto;
    }
  }

  .msg {
    &-box {
      border-left: 1px dotted #999;
      height: calc(100vh - 22px);
      padding: 10px;
      box-sizing: border-box;
    }

    &-list {
      height: calc(100% - 40px);
      padding: 10px;
      box-sizing: border-box;
      overflow-y: auto;
    }

    &-li {
      margin-bottom: 10px;

      &--self {
        .msg-body {
          background: #59b259;
        }

        & > div {
          display: flex;
          justify-content: flex-end;
        }
      }

      &--notice {
        text-align: center;
      }
    }

    &-info {
      font-size: 14px;
      color: #999;
    }

    &-body {
      padding: 4px;
      background: #ccc;
      border-radius: 4px;
      display: inline-block;

      &--notice {
        color: #999;
      }
    }

    &-footer {
      display: flex;
    }
  }
</style>
