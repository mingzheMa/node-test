import { createApp } from "vue";
import App from "./App.vue";

import routers from "@/routers";

import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

const app = createApp(App);

app.use(routers);

app.use(ElementPlus);

app.mount("#app");
