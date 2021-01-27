<template>
  <div>
    <form ref="form">
      <label
        >number:
        <input type="text" v-model="number" />
      </label>
      <br />
      <label
        >password:
        <input type="password" v-model="password" />
      </label>
      <br />
    </form>
    <button @click="login">登录</button>
  </div>
</template>
<script>
import { LOGIN } from "@/store/type.js";
import store from "@/store";
export default {
  data: () => ({
    number: "teacher",
    password: "123456"
  }),
  methods: {
    login() {
      store.dispatch(LOGIN, {
        username: this.number,
        password: this.password
      });
      this.$refs.form.reset();
    }
  }
};
</script>
