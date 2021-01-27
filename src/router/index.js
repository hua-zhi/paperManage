import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import Login from "@/view/Login.vue";
// import store from "@/store";
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Home
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
  // console.log(to.meta.roles);
  // if (to.meta.roles.includes(store.state.role)) {
  next();
  // }
});
export default router;
