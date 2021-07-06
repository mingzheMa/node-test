import { ref, nextTick } from "vue";

import userCom from "../../../composition/user";

export default function (socket) {
  // 消息列表
  const msgListRef = ref([
    // {
    //   user: "1", // 用户名称
    //   user_id: "4", // 用户id
    //   msg_id: "2", // 消息id
    //   msg: "3", // 消息内容
    //   msg_type: "SELF" // 消息类型 NOTICE|USER|SELF
    // },
  ]);

  // 消息列表元素
  const msgListDomRef = ref(null);

  // 监听消息事件，添加消息
  socket.on("msg", data => {
    // 判断消息类型
    let msgType = "USER";
    if (data.isNotice) {
      msgType = "NOTICE";
    } else if (data.from.id === (userCom.userInfoRef.value as any).id) {
      msgType = "SELF";
    }

    msgListRef.value.push({
      user: data.from.user_name,
      user_id: data.from.id,
      msg_id: data.id,
      msg: data.content,
      msg_type: msgType
    });

    backBottom();
  });

  // 输入消息
  const msgRef = ref("");

  // 用户发送消息
  function sendMsg() {
    if (msgRef.value) {
      socket.emit("msg", {
        from: userCom.userInfoRef.value,
        to: null,
        content: msgRef.value
      });

      msgRef.value = "";
      backBottom();
    }
  }

  // 回到底部
  function backBottom() {
    nextTick(() => {
      msgListDomRef.value.scrollTop = msgListDomRef.value.scrollHeight;
    });
  }

  return {
    msgListDomRef,
    msgListRef,
    msgRef,
    sendMsg,
    backBottom
  };
}
