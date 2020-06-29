import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
    component: () =>
      import(/* webpackChunkName: "mainlayout" */ "@/layout/MainLayout.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        meta: {
          title: "bugmaker"
        },
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue")
      },
      {
        path: "/blog",
        name: "blog-list",
        meta: {
          title: "博客列表"
        },
        component: () =>
          import(
            /* webpackChunkName: "blog-list" */ "@/views/blog/list/index.vue"
          )
      },
      {
        path: "/blog/detail/:id",
        name: "blog-detail",
        meta: {
          title: "博客详情"
        },
        component: () =>
          import(
            /* webpackChunkName: "blog-detail" */ "@/views/blog/detail/index.vue"
          )
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录"
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/user/login/index.vue")
  },
  {
    path: "*",
    name: "404",
    meta: {
      title: "Not Found"
    },
    component: () => import(/* webpackChunkName: "404" */ "@/views/404.vue")
  }
];

const scrollBehavior = () => {
  return {
    x: 0,
    y: 0
  };
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior
});

export default router;
