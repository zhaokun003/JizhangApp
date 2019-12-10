<template>
  <div>
    <Top :left="left" :msg="msg" @gouser="goback"></Top>

    <div class="name">
      <span>新昵称：</span>
      <input type="text" v-model="nickname" maxlength="18" />
    </div>

    <div class="btn" @click="save">
      <span>保存</span>
    </div>
  </div>
</template>

<script>
import Top from "@/components/Top.vue";
import { Dialog } from "vant";

export default {
  name: "",
  props: [""],
  data() {
    return {
      left: "&#xe623;",
      msg: "修改昵称",
      nickname: "",
      token: ""
    };
  },

  components: { Top },

  mounted() {
    this.token = localStorage.getItem("user_token");
  },

  methods: {
    goback() {
      this.$router.push("/change");
    },
    save() {
      if (!this.nickname.length) {
        Dialog.alert({
          message: "请输入要修改的用户名！"
        });
        setTimeout(() => {
          Dialog.close();
        }, 1000);
      } else if (this.nickname.length < 2) {
        Dialog.alert({
          message: "用户名不得低于2个字符！"
        });
        setTimeout(() => {
          Dialog.close();
        }, 1000);
      } else if (this.nickname.length > 18) {
        Dialog.alert({
          message: "用户名不得超过18个字符！"
        });
        setTimeout(() => {
          Dialog.close();
        }, 1000);
      }
      this.axios({
        method: "post",
        url:
          "http://jizhang-api-dev.it266.com/api/user/profile/update?token=" +
          this.token,
        responseType: "json",
        params: {
          nickname: this.nickname
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.status) {
            Dialog.alert({
              message: "修改成功！"
            });
            setTimeout(() => {
              Dialog.close();
              this.$router.push("/change");
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
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.name {
  width: 90%;
  height: 60px;
  margin: 0 auto;
  line-height: 60px;
  border-bottom: 1px solid #cecbcb;

  input {
    margin-left: 20px;
    // width: 300px;
    font-size: 16px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #fff;
  }
}
.btn {
  width: 90%;
  height: 50px;
  margin: 30px auto;
  text-align: center;
  line-height: 50px;
  color: #fff;
  background-color: #60b15b;
  border-radius: 100px;
}
</style>