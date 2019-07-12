<template>
  <div id="logo">
    <div class="login-container">
      <el-form
        :model="ruleForm2"
        :rules="rules2"
        status-icon
        ref="ruleForm2"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-page"
      >
        <h1 class="title">后台系统登录</h1>
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
         
            type="password"
            v-model="ruleForm2.password"
            auto-complete="off"
            placeholder="密码"
          ></el-input>
        
        </el-form-item>
        <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        username: "admin",
        password: "admin"
      },
      rules2: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      },
      checked: false
    };
  },
  methods: {
    handleSubmit(event) {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true;
          if (
            this.ruleForm2.username === "admin" &&
            this.ruleForm2.password === "admin"
          ) {
            this.logining = false;
            sessionStorage.setItem("user", this.ruleForm2.username);
            this.$router.push({ path: "/Table" });
          } else {
            this.logining = false;
            this.$alert("username or password wrong!", "info", {
              confirmButtonText: "ok"
            });
          }
        } else {
          console.log("error submit!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
#logo {
  background: url("./../assets/images/bg.jpg");
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
}
.login-container {
  width: 100%;
  height: 100%;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: rgb(57, 243, 166);
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
.title {
  color: #fff;
  text-align: center;
  margin-bottom: 50px;
}
</style>