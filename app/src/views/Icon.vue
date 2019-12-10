<template>
  <div>
    <Top :left="left" :msg="msg" @gouser="goback"></Top>

    <div class="icon">
      <div class="box">
        <div class="file">
          <img :src="file" class="pic" />
          <input type="file" @change="icon" />
        </div>
      </div>

      <button @click="sub">提交</button>
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
      msg: "修改头像",
      token: "",
      left: "&#xe623;",
      file: "",
      fileKey: "",
      arr: "",
      nickname: ""
    };
  },

  components: { Top },

  computed: {},

  beforeMount() {},

  mounted() {
    this.token = localStorage.getItem("user_token");
    this.arr = this.$route.query.arr;

    this.axios({
      method: "get",
      url:
        "http://jizhang-api-dev.it266.com/api/user/profile?token=" + this.token,
      responseType: "json"
    })
      .then(res => {
        // console.log(res);
        if (res.data.status) {
          this.file = res.data.data.avatar_url;
          this.nickname = res.data.data.nickname;
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

  methods: {
    goback() {
      this.$router.push("/change");
    },
    icon(e) {
      let files = e.target.files[0];

      let params = new FormData();

      params.append("file", files);

      this.axios({
        method: "post",
        url:
          "http://jizhang-api-dev.it266.com/api/upload/image?token=" +
          this.token,
        responseType: "json",
        data: params
      })
        .then(res => {
          console.log(res);
          if (res.data.status) {
            this.file = res.data.data.file.thumbnailUrl._temp;

            this.fileKey = res.data.data.file.fileKey;

            // console.log(this.fileKey);
            // console.log(this.file);
          }
        })
        .catch(error => {
          // alert("连接超时，请重试!");
          Dialog.alert({
            message: "连接超时，请重试！"
          });
          setTimeout(() => {
            Dialog.close();
          }, 1000);
          console.log(error);
        });
    },
    sub() {
      this.axios({
        method: "post",
        url:
          "http://jizhang-api-dev.it266.com/api/user/profile/update?token=" +
          this.token,
        responseType: "json",
        params: {
          avatar: this.fileKey
          // nickname: this.nickname
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.status) {
            Dialog.alert({
              message: "修改成功！"
            });
            setTimeout(() => {
              Dialog.close();
            }, 1000);

            this.$router.push("/change");
          } else {
            Dialog.alert({
              message: "修改失败，请重试！"
            });
            setTimeout(() => {
              Dialog.close();
            }, 1000);
          }
        })
        .catch(error => {
          // alert("连接超时，请重试!");
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
.icon {
  width: 90%;
  height: 300px;
  margin: 0 auto;

  .pic {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 100%;
    margin: 0 auto;
    padding: 30px 0 30px 0;
  }

  .file {
    width: 100px;
    margin: 0 auto;
  }

  button {
    width: 100%;
    height: 50px;
    line-height: 50px;
    margin-top: 30px;
    background-color: #60b15b;
    border: none;
    outline: none;
    font-size: 16px;
    color: #fff;
    border-radius: 100px;
  }
}
</style>