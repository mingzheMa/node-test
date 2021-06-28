import { createRouter, createWebHistory } from "vue-router";
import cookie from "cookie";
import { ElMessage } from "element-plus";

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
      component: () => import("@/pages/index/index.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    const { token } = cookie.parse(document.cookie);

    if (token) {
      next();
    } else {
      ElMessage({
        showClose: true,
        message: "account be overdue",
        type: "error"
      });
      setTimeout(() => {
        location.href = "/login";
      },1000);
    }
  } else {
    next();
  }
});

export default router;
