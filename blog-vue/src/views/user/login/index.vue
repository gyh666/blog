<template>
  <div class="login">
    <el-form
      class="form"
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" clear />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" clear />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入用户名", trigger: "blur" }]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return;
        let params = this.form;
        const { code, msg/* , data */ } = await this.$api.login(params);
        if (code != 200) return this.$message.error(msg);
        // console.log(data);
        this.$message.success("登录成功");
        this.$route.query.redirect
          ? this.$router.push(this.$route.query.redirect)
          : this.$router.replace({ path: "/" });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .form {
    width: 400px;
    height: auto;
  }
}
</style>
