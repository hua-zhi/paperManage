<template>
  <div class="home">
    <h1>welcome to my pages</h1>
    <navbar />
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  components: {
    navbar: () => import("@/views/NavBar.vue")
  }
};
</script>
