const Layout = () => import("@/layout/index.vue");

export default [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      showLink: false,
      rank: 101
    }
  },
  {
    path: "/redirect",
    component: Layout,
    meta: {
      title: "加载中...",
      showLink: false,
      rank: 102
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "Redirect",
        component: () => import("@/layout/redirect.vue")
      }
    ]
  },
  {
    path: "/account-settings",
    name: "AccountSettings",
    component: () => import("@/views/account-settings/index.vue"),
    meta: {
      title: "账户设置",
      showLink: false,
      rank: 104
    }
  },
  {
    path: "/large-screen",
    name: "LiveLargeScreen",
    component: () => import("@/views/live/largeScreen/index.vue"),
    meta: {
      icon: "ri:list-check",
      title: "大屏",
      rank: 1
    }
  }
] satisfies Array<RouteConfigsTable>;
