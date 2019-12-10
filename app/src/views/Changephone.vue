<template>
  <div class="changephone">
    <Top :left="left" :msg="msg" @gouser="goback"></Top>
    <div class="content">
      <div class="pwd">
        <input type="password" v-model="password" autocomplete="请输入原密码" placeholder="请输入原密码" />
      </div>

      <div class="phone">
        <input type="text" v-model="mobile" placeholder="请输入新手机号" maxlength="11" />
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
        <button class="register" @click="register">完成</button>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "@/components/Top.vue";
import { Dialog } from "vant";

export default {
  props: [""],
  data() {
    return {
      left: "&#xe623;",
      msg: "修改手机号",
      mobile: "",
      password: "",
      repassword: "",
      key: "",
      captcha_key: "",
      captcha_code: "",
      xxx: "",
      verify: "",
      token: ""
    };
  },

  components: { Top },

  mounted() {
    this.token = localStorage.getItem("user_token");

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
          message: "连接超时，请重试！"
        });
        setTimeout(() => {
          Dialog.close();
        }, 1000);

        console.log(error);
      });
  },

  methods: {
    goback() {
      this.$router.push("/change");
    },
    // 获取图形验证码
    picture() {
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
            message: "连接超时，请重试！"
          });
          setTimeout(() => {
            Dialog.close();
          }, 1000);

          console.log(error);
        });
    },
    // 获取验证码
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
              message: "请输入图形验证码！"
            });
            setTimeout(() => {
              Dialog.close();
            }, 1000);
          } else if (this.mobile.length == 0) {
            Dialog.alert({
              message: "请输入手机号！"
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
              message: "图形验证码错误！"
            });
            setTimeout(() => {
              Dialog.close();
            }, 1000);
          }
        })
        .catch(error => {
          Dialog.alert({
            message: "连接超时，请重试！"
          });
          setTimeout(() => {
            Dialog.close();
          }, 1000);
          console.log(error);
        });
    },
    register() {
      this.axios({
        method: "post",
        url:
          "http://jizhang-api-dev.it266.com/api/user/mobile?token=" +
          this.token,
        responseType: "json",
        params: {
          mobile: this.mobile,
          password: this.password,
          verify: this.verify
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.status) {
            Dialog.alert({
              message: "手机号修改成功！"
            });
            setTimeout(() => {
              Dialog.close();
              this.$router.push("/change");
            }, 1000);
          } else {
            Dialog.alert({
              message: "手机号修改失败，请重试！"
            });
            setTimeout(() => {
              Dialog.close();
            }, 1000);
          }
        })
        .catch(error => {
          Dialog.alert({
            message: "连接超时，请重试！"
          });
          setTimeout(() => {
            Dialog.close();
          }, 1000);
          console.log(error);
        });
    }
  }
};
</script>
<style lang='scss' scoped>
.changephone {
  // min-width: 1200px;
  width: 100%;
}
.content {
  // width: 1000px;
  width: 90%;

  margin: 0 auto;
  border: 1px solid #fff;
  border-radius: 15px;
  background-color: #fff;

  .phone {
    width: 100%;

    margin: 15px auto;
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
    width: 100%;
    padding: 20px 0;
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
    width: 100%;
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
    width: 100%;
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

    width: 100%;
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
</style>