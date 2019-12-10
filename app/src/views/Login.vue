<template>
  <div class="login">
    <div class="title">
      <h1>Hi,欢迎回来～</h1>
    </div>

    <div class="content">
      <div class="phone">
        <span class="iconfont">&#xe657;</span>
        <input type="text" v-model="mobile" placeholder="请输入手机号" maxlength="11" />
      </div>

      <div class="pwd">
        <span class="iconfont">&#xe64e;</span>
        <input type="password" v-model="password" autocomplete="请输入密码" placeholder="请输入密码" />
      </div>

      <div class="log">
        <button class="logining" @click="login">登陆</button>
      </div>
    </div>
    <div class="footer">
      <span>没有账号？</span>
      <router-link to="/register">去注册</router-link>
      <div class="forget">
        <router-link to="/forget">忘记密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { Dialog } from "vant";

export default {
  components: {},
  data() {
    return {
      mobile: "",
      password: "",
      key: "",
      captcha_key: "",
      xxx: "",
      token: "",
      expire: "",
      id: ""
    };
  },
  mounted() {
    // document.body.setAttribute("style", "background:url(../assets/img/1.jpeg)");
    document.body.setAttribute("style", "background-color:#e8eaec");

    document.body.style.backgroundSize = "cover";
    if (localStorage.getItem("user_token")) {
      this.$router.push("/");
    }
  },

  methods: {
    login() {
      if (this.mobile.length == 0) {
        Dialog.alert({
          message: "请输入账号!"
        });
        setTimeout(() => {
          Dialog.close();
        }, 1000);
        return;
      }

      if (this.password.length == 0) {
        Dialog.alert({
          message: "请输入密码!"
        });
        setTimeout(() => {
          Dialog.close();
        }, 1000);
        return;
      }

      // 使用手机号和密码获取token
      this.axios({
        method: "post",
        url: "http://jizhang-api-dev.it266.com/api/user/token/mobile",
        responseType: "json",
        params: {
          mobile: this.mobile,
          password: this.password,
          captcha_key: "",
          captcha_code: ""
        }
      })
        .then(res => {
          // console.log(res)

          if (res.data.status) {
            this.token = res.data.data.token;
            this.expire = res.data.data.expire;
            this.id = res.data.data.id;
            // console.log(this.id);

            // 储存token
            localStorage.setItem("user_token", this.token);
            // 存储ID
            localStorage.setItem("user_id", this.id);

            Dialog.alert({
              message: "登录成功！"
            });

            setTimeout(() => {
              Dialog.close();
              this.$router.push("/");
            }, 1000);

          } else {
            Dialog.alert({
              message: "账号或密码错误!"
            });
            setTimeout(() => {
              Dialog.close();
            }, 1000);
          }
        })
        .catch(error => {
          Dialog.alert({
            message: "连接超时，请重试!"
          });
          setTimeout(() => {
            Dialog.close();
          }, 1000);
          console.log(error);
        });
    }
  },
  beforeDestroy: function() {
    document.body.removeAttribute("style");
  }
};
</script>


<style scoped  lang="scss"  >
@import "../assets/font/iconfont.css";

.login {
  // min-width: 1200px;
  width: 100%;
  color: #2c3e50;
  .title {
    padding: 100px 0 30px 0;
    font-size: 16px;
    text-align: center;
  }
  .content {
    // width: 1000px;
    width: 85%;

    margin: 0 auto;
    border: 1px solid #fff;
    border-radius: 15px;
    background-color: #fff;

    .phone {
      // width: 900px;
      width: 85%;

      margin: 20px auto;
      padding: 15px 0;
      border-bottom: 1px solid rgb(225, 217, 217);

      // margin: 30px 50px;
      span {
        font-size: 16px;
      }
      input {
        border: none;
        outline: medium;
        font-size: 16px;
        margin-left: 15px;
      }
    }

    .pwd {
      // width: 900px;
      width: 85%;
      padding: 15px 0;
      border-bottom: 1px solid rgb(225, 217, 217);
      margin: 0 auto;

      // margin: 30px 50px;
      span {
        font-size: 16px;
      }
      input {
        border: none;
        outline: medium;
        margin-left: 15px;
        font-size: 16px;
      }
    }

    .log {
      padding: 20px 0;
      // width: 900px;
      width: 85%;

      // margin: 30px 50px 100px 50px;
      margin: 20px auto 30px auto;
      height: 50px;
      // line-height: 80px;

      .logining {
        height: 50px;
        // width: 900px;
        width: 100%;
        border-radius: 100px;
        color: #fff;
        background-color: rgb(87, 176, 108);

        border: 0;
        font-size: 16px;
        cursor: pointer;
        outline: none;
        box-shadow: none;
      }
    }
  }
  .footer {
    // width: 1000px;
    width: 85%;
    margin: 30px auto;
    font-size: 14px;

    a {
      color: rgb(39, 40, 38);
    }
    .forget {
      float: right;
    }
  }
}
</style>
