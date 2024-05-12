export default {
  path: "/tool",
  redirect: "/tool/form-design",
  meta: {
    icon: "ri:list-check",
    title: "系统工具",
    rank: 99
  },
  children: [
    {
      path: "/tool/form-design",
      name: "FormDesign",
      component: () => import("@/views/tool/formDesign/index.vue"),
      meta: {
        icon: "ri:bank-card-line",
        title: "表单设计器",
        showParent: true
      }
    },
    {
      path: "/tool/code-gen",
      name: "codeGen",
      component: () => import("@/views/tool/codeGen/index.vue"),
      meta: {
        icon: "ri:bank-card-line",
        title: "代码生成",
        showParent: true
      }
    },
    {
      path: "/tool/code-gen-edit/:tableId",
      name: "codeGenEdit",
      component: () => import("@/views/tool/codeGen/editTable.vue"),
      meta: {
        title: "修改生成配置",
        showLink: false
      }
    },
    {
      path: "/tool/swagger",
      name: "swagger",
      component: () => import("@/views/tool/swagger/index.vue"),
      meta: {
        icon: "ri:bank-card-line",
        title: "系统接口",
        showParent: true
      }
    }
  ]
};
