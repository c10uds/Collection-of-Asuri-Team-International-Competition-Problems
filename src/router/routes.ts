import HomeView from "@/views/HomeView.vue";
import type { RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "首页",
    component: HomeView,
    children: [],
    meta: {
      hideInMenu: true,
      icon: "<icon-home />",
    },
  },
];
