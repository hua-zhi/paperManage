<template>
  <div>
    <ul>
      <!-- 根据当前页面的子路由和权限动态渲染 -->
      <div v-for="(c, index) in this.children" :key="index">
        <li v-if="permission(c.meta.roles)">
          <router-link :to="`${path}/${c.path}`" :key="index">{{
            c.meta.title
          }}</router-link>
        </li>
      </div>
    </ul>
  </div>
</template>
<script>
import router from "@/router";
import store from "@/store";
export default {
  data: () => ({
    children: null,
    path: null
  }),
  methods: {
    permission(roles) {
      if (roles.includes(store.state.role)) return true;
      else return false;
    },
    getRouteInfo() {
      let children = router.options.routes.find(
        r => r.name === this.$route.name
      ).children;
      this.children = children;
      this.path = this.$route.path;
      console.log("11" + children);
    }
  },
  created() {
    // 子路由获得一次，不然会根据路劲的变化获取新值
    this.getRouteInfo();
  }
};
</script>
