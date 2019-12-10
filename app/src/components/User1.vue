<template>
  <div class="user1">
    <div class="top"></div>
    <div class="list" v-for="(data,index) in data" :key="index">
      <div class="content-box">
        <div class="content-box-left">
          <span class="iconfont" v-html="data.logo"></span>
        </div>
        <div class="content-box-right">
          <div class="content-t">
            <span>{{data.name}}</span>
            <span class="iconfont" v-html="data.arrow"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 第二部分 -->
    <div class="top"></div>
    <div class="list" v-for="(data2,index) in data2" :key="'item'+index">
      <div class="content-box">
        <div class="content-box-left">
          <span class="iconfont" v-html="data2.logo2"></span>
        </div>
        <div class="content-box-right">
          <div class="content-t">
            <span>{{data2.name2}}</span>
            <span class="iconfont" v-html="data2.arrow2"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 退出登陆 -->
    <div class="top"></div>
    <div @click="exit" class="list box-none" v-for="(data3,index) in data3" :key="'itemm'+index">
      <div class="content-box">
        <div class="content-box-left">
          <span class="iconfont" v-html="data3.logo3"></span>
        </div>
        <div class="content-box-right">
          <div class="content-t">
            <span>{{data3.name3}}</span>
            <span class="iconfont" v-html="data3.arrow3"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";

export default {
  props: ["data", "data2", "data3"],
  data() {
    return {
      token: ""
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    // console.log(this.key.index)
    this.token = localStorage.getItem("user_token");
  },

  methods: {
    exit() {
      this.axios({
        method: "get",
        url:
          "http://jizhang-api-dev.it266.com/api/user/logout?token=" +
          this.token,
        responseType: "json"
      })
        .then(res => {
          // console.log(res);
          if (res.data.status) {
            Dialog.alert({
              message: "退出成功!"
            });
            setTimeout(() => {
              Dialog.close();
            }, 1000);
            localStorage.removeItem("user_token");
            localStorage.removeItem("user_id");

            this.$router.push("/login");
          } else {
            Dialog.alert({
              message: "连接超时，请重试!"
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

  watch: {}
};
</script>
<style lang='scss' scoped>
.user1 {
  width: 100%;
}
.top {
  width: 100%;
  height: 10px;
  background-color: #eeeeee;
}

.box-none {
  border: none !important;
}
.list {
  border-bottom: 1px solid #eeeeee;
}
.content-box {
  width: 90%;
  margin: 0 auto;
  height: 40px;
  display: flex;
  flex-direction: row;

  .content-box-left {
    width: 30px;
    height: 20px;
    float: left;
    margin: 10px 0px;
    // margin:0 auto;
    // line-height: 50px;

    .iconfont {
      font-size: 14px;
      color: green;
    }
  }
  .content-box-right {
    height: 40px;
    float: left;
    flex-grow: 1;
    overflow: hidden;
    /*超出部分隐藏*/
    white-space: nowrap;
    color: rgb(126, 124, 124);

    .content-t {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      .iconfont {
        float: right;
        // margin-right: 10px;
        font-size: 16px;
      }
    }
  }
}
</style>