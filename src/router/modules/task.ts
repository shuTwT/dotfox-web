export default {
  path: "/task",
  meta: {
    icon: "ri:list-check",
    title: "任务管理",
    rank: 98
  },
  children: [
    {
      path: "/task/process",
      name: "TaskProcess",
      component: () => import("@/views/flowable/task/my-process/index.vue"),
      meta: {
        icon: "ri:bank-card-line",
        title: "已发流程",
        showParent: true
      }
    },
    {
      path: "/task/todo",
      name: "TaskTodo",
      component: () => import("@/views/flowable/task/todo/index.vue"),
      meta: {
        icon: "ri:bank-card-line",
        title: "待办任务",
        showParent: true
      }
    },
    {
      path: "/task/finished",
      name: "TaskFinished",
      component: () => import("@/views/flowable/task/finished/index.vue"),
      meta: {
        icon: "ri:bank-card-line",
        title: "已办任务",
        showParent: true
      }
    }
  ]
} satisfies RouteConfigsTable;
