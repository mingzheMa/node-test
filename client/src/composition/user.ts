import { ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

const userInfoRef = ref({});

async function getUserInfo() {
  const res: any = await axios.get("/api/auth/who_am_i").catch(err => {
    ElMessage.error("account be overdue");
    setTimeout(() => {
      location.href = "/login";
    }, 1000);
  });
  userInfoRef.value = res.data;
}

export default {
  userInfoRef,
  getUserInfo
}