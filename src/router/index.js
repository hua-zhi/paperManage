import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/Login",
    name: "Login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/",
    redirect: { name: "Login" }
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      roles: [1, 2, 3]
    },
    children: [
      {
        path: "1",
        name: "1",
        component: () => import("@/views/role/student/Student.vue"),
        meta: {
          roles: [1, 2, 3],
          title: "文件下载"
        }
      },
      {
        path: "2",
        name: "2",
        component: () => import("@/views/role/teacher/Teacher.vue"),
        meta: {
          roles: [2, 3],
          title: "学生管理"
        }
      },
      {
        path: "3",
        name: "3",
        component: () => import("@/views/role/admin/Admin.vue"),
        meta: {
          roles: [3],
          title: "教师管理"
        }
      }
    ]
  },
  {
    name: "nomatch",
    path: "/:pathMatch(.*)*",
    redirect: { name: "Home" }
  }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  console.log(to.path);
  if (to.path === "/login") return next();
  const tokenstr = sessionStorage.getItem("token");
  if (!tokenstr) return next("/login");
  console.log(to.meta.roles);
  if (to.meta.roles.includes(store.state.role)) {
    next();
  }
});
export default router;
