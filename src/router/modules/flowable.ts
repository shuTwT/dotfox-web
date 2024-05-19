export default {
  path: "/flowable",
  meta: {
    icon: "ri:list-check",
    title: "流程管理",
    rank: 97
  },
  children: [
    {
      path: "/flowable/definition",
      name: "FlowableDefinition",
      component: () => import("@/views/flowable/definition/index.vue"),
      meta: {
        icon: "ri:bank-card-line",
        title: "流程定义",
        showParent: true
      }
    },
    {
      path: "/flowable/form",
      name: "FlowableForm",
      component: () => import("@/views/flowable/form/index.vue"),
      meta: {
        icon: "ri:bank-card-line",
        title: "表单配置",
        showParent: true
      }
    },
    {
      path: "/flowable/expression",
      name: "FlowableExpression",
      component: () => import("@/views/flowable/expression/index.vue"),
      meta: {
        icon: "ri:bank-card-line",
        title: "流程表达式",
        showParent: true
      }
    },
    {
      path: "/flowable/listener",
      name: "FlowableListener",
      component: () => import("@/views/flowable/listener/index.vue"),
      meta: {
        icon: "ri:bank-card-line",
        title: "流程监听",
        showParent: true
      }
    }
  ]
} satisfies RouteConfigsTable;
