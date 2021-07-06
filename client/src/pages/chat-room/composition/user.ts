import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

import userCom from "../../../composition/user";

export default function (socket, msgCom) {
  const router = useRouter();

  // 用户列表
  const userListRef = ref([
    // {
    //   info: {}, // 用户信息
    //   login_date: "" // 进入房间事件
    // }
  ]);

  // 用户进入
  function userin(){
    socket.emit("userin", userCom.userInfoRef.value);
  }

  // 用户退出
  function userout(){
    socket.emit("userout", userCom.userInfoRef.value);
  }

  // 监听是否进入成功
  socket.on("userin", data => {
    if (data.code === 401) {
      ElMessage.error("remote userin");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  });

  // 获取所有用户
  socket.on("users", data => {
    // 登入时间排序
    userListRef.value = data.sort(
      (befor, after) => after.login_date - befor.login_date
    );
  });

  return {
    userin,
    userout,
    userListRef
  };
}
