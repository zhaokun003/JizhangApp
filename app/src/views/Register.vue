<template>
  <div id="rapp">
    <div class="title">
      <h1>欢迎加入Timi记账</h1>
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
      <div class="pic">
        <input type="text" v-model="key" placeholder="图形验证码" maxlength="4" />
        <button @click="picture" class="tu">点击获取图形码</button>
        <img v-bind:src="xxx" @click="picture" class="ma" />
      </div>

      <div class="msg">
        <input type="text" v-model="verify" placeholder="输入验证码" />
        <button @click="yanzheng">获取验证码</button>
      </div>

      <div class="rag">
        <button class="register" @click="register">注册</button>
      </div>
    </div>
    <div class="footer">
      <span>已有账号？</span>
      <router-link to="/login">登陆</router-link>
    </div>
    <!-- <router-view /> -->
  </div>
</template>

<script>
import { Dialog } from "vant";

export default {
  mounted() {
    // document.body.setAttribute("style", "background:url(./1.jpeg)");
    document.body.setAttribute("style", "background-color:#e8eaec");

    document.body.style.backgroundSize = "cover";

    // 图形二维码
    this.axios({
      method: "get",
      url: "http://jizhang-api-dev.it266.com/api/captcha",
      responseType: "json",
      params: {}
    })
      .then(res => {
        var data = res.data.data;
        // 显示二维码图片
        document.getElementsByClassName("tu")[0].style.display = "none";
        document.getElementsByClassName("ma")[0].style.display = "block";
        this.xxx = data.url;
        // 获取二维码的密码  : captcha_key
        this.captcha_key = data.key;
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
  },
  components: {},
  data() {
    return {
      mobile: "",
      password: "",
      key: "",
      captcha_key: "",
      captcha_code: "",
      xxx: "",
      verify: "",
      token: "",
      id: ""
    };
  },

  methods: {
    // 获取图形验证码
    picture() {
      this.axios({
        method: "get",
        url: "http://jizhang-api-dev.it266.com/api/captcha",
        responseType: "json",
      })
        .then(res => {
          var data = res.data.data;
          // 显示二维码图片
          document.getElementsByClassName("tu")[0].style.display = "none";
          document.getElementsByClassName("ma")[0].style.display = "block";
          this.xxx = data.url;
          // 获取二维码的密码  : captcha_key
          this.captcha_key = data.key;
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
    },

    yanzheng() {
      this.axios({
        method: "post",
        url: "http://jizhang-api-dev.it266.com/api/sms/verify",
        responseType: "json",
        params: {
          mobile: this.mobile,
          captcha_key: this.captcha_key,
          captcha_code: this.key
        }
      })
        .then(res => {
          // console.log(res);
          var msg = res.data.data;

          if (res.data.status) {
            Dialog.alert({
              message: msg
            });
          } else if (this.key.length == 0) {
            Dialog.alert({
              message: "请输入图形验证码!"
            });
            setTimeout(() => {
              Dialog.close();
            }, 1000);
          } else if (this.mobile.length == 0) {
            Dialog.alert({
              message: "请输入手机号!"
            });
            setTimeout(() => {
              Dialog.close();
            }, 1000);
          } else if (res.data.data == "手机格式不正确") {
            Dialog.alert({
              message: "手机格式不正确!"
            });
            setTimeout(() => {
              Dialog.close();
            }, 1000);
          } else {
            Dialog.alert({
              message: "图形验证码错误!"
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
    },
    register() {
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

      this.axios({
        method: "post",
        url: "http://jizhang-api-dev.it266.com/api/user/register",
        responseType: "json",
        params: {
          mobile: this.mobile,
          password: this.password,
          verify: this.verify
        }
      })
        .then(res => {
          var token = res.data.data.token;
          var id = res.data.data.id;

          // console.log(res);

          if (res.data.status) {
            // 储存token
            localStorage.setItem("user_token", token);
            // 存储ID
            localStorage.setItem("user_id", id);
            Dialog.alert({
              message: "注册成功!"
            });
            setTimeout(() => {
              this.$router.push("/");

              Dialog.close();
            }, 1000);
          } else if (res.data.data == "手机格式不正确") {
            Dialog.alert({
              message: "手机格式不正确!"
            });
            setTimeout(() => {
              Dialog.close();
            }, 1000);
          } else if (res.data.data == "验证码不正确") {
            Dialog.alert({
              message: "短信验证码不正确!"
            });
            setTimeout(() => {
              Dialog.close();
            }, 1000);
          } else {
            Dialog.alert({
              message: "您已经注册过了，快去登陆吧!"
            });
            setTimeout(() => {
              Dialog.close();
              this.$router.push("/login");
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

<style  scoped lang="scss"  >
@import "../assets/font/iconfont.css";

// body {
//   background: url("../assets/img/1.jpeg");
//   background-size: cover;
// }
#rapp {
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
      width: 85%;

      margin: 20px auto;
      padding: 15px 0;
      border-bottom: 1px solid rgb(225, 217, 217);
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
      width: 85%;
      padding: 15px 0;
      border-bottom: 1px solid rgb(225, 217, 217);
      margin: 0 auto;
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

    .pic {
      width: 85%;
      margin: 20px auto;

      input {
        height: 50px;
        line-height: 50px;
        width: 60%;
        font-size: 16px;
        // padding: 0 10px;
        text-align: center;
        border: none;
        outline: medium;
        border-bottom: 1px solid rgb(225, 217, 217);
      }

      button {
        width: 30%;
        float: right;
        font-size: 12px;
        margin-top: 10px;
        height: 40px;
        line-height: 40px;
        color: #fff;
        background-color: rgb(87, 176, 108);
        border: none;
        outline: medium;
        cursor: pointer;
        border-radius: 10px;
      }
      .ma {
        width: 30%;
        float: right;
        margin-top: 10px;

        font-size: 14px;
        height: 40px;
        line-height: 40px;
        color: #fff;

        border: none;
        outline: medium;
        cursor: pointer;
        border-radius: 10px;
        display: none;
      }
    }

    .msg {
      // width: 900px;
      width: 85%;
      // padding: 30px 0;
      margin: 20px auto;
      // display: none;

      input {
        height: 50px;
        line-height: 50px;
        width: 60%;
        text-align: center;
        font-size: 16px;
        border: none;
        outline: medium;
        border-bottom: 1px solid rgb(225, 217, 217);
      }

      button {
        // width: 280px;
        width: 30%;
        float: right;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        margin-top: 10px;
        color: #fff;
        background-color: rgb(87, 176, 108);
        border: none;
        outline: medium;
        cursor: pointer;
        border-radius: 10px;
      }
    }

    .rag {
      padding: 20px 0;

      width: 85%;
      margin: 20px auto;
      .register {
        height: 50px;
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
  }
}
</style>
