export default {
  path: "/datav",
  meta: {
    icon: "ri:list-check",
    title: "数据大屏",
    rank: 96
  },
  children: [
    {
      path: "/datav/data-screen-list",
      name: "DatavDataScreenList",
      component: () => import("@/views/datav/data-screen-list/index.vue"),
      meta: {
        icon: "ri:bank-card-line",
        title: "大屏管理",
        showParent: true
      }
    },
    {
      path: "/datav/data-map-list",
      name: "DatavDataMapList",
      component: () => import("@/views/datav/data-map-list/index.vue"),
      meta: {
        icon: "ri:bank-card-line",
        title: "地图管理",
        showParent: true
      }
    }
  ]
} satisfies RouteConfigsTable;
