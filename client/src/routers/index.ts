import { createRouter, createWebHistory } from "vue-router";
import cookie from "cookie";
import { ElMessage } from "element-plus";

import layout from "@/layout/index.vue";
import userComp from "../composition/user"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/login/index.vue")
    },
    {
      path: "/",
      name: "index",
      meta: {
        auth: true
      },
      component: layout,
      children: [
        {
          path: "/",
          component: () => import("@/pages/index/index.vue")
        },
        {
          path: "websocket",
          component: () => import("@/pages/websocket/index.vue")
        },
        {
          path: "chat-room",
          component: () => import("@/pages/chat-room/index.vue")
        }
      ]
    }
  ]
});

const notAuthPath = ["/login"]
router.beforeEach(async (to, from, next) => {
  if(!notAuthPath.includes(to.path) && !Object.keys(userComp.userInfoRef.value).length){
    await userComp.getUserInfo()
  }

  if (to.meta.auth) {
    const { token } = cookie.parse(document.cookie);

    if (token) {
      next();
    } else {
      ElMessage.error("account be overdue");
      setTimeout(() => {
        location.href = "/login";
      }, 1000);
    }
  } else {
    next();
  }
});

export default router;
