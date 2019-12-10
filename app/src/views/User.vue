<template>
  <div class="user">
    <div class="icon">
      <div class="img" @click="changeicon">
        <img :src="avatar_url" />
        <!-- <img src="../assets/img/1.jpeg" alt=""> -->
      </div>
      <div class="nickname">
        <span>{{nickname}}</span>
      </div>
    </div>

    <div class="list">
      <div class="total">
        <span class="total-color1">0</span>
        <span class="total-font1">已邀请</span>
      </div>
      <div class="total" @click="gobook">
        <span class="total-color2">{{book}}</span>
        <span class="total-font2">总账本</span>
      </div>
      <div class="total total-last" @click="golist">
        <span class="total-color3">{{list}}</span>
        <span class="total-font3">共记账</span>
      </div>
    </div>

    <User1 :data="data" :data2="data2" :data3="data3"></User1>
    <div class="kongbai"></div>

    <!-- 底部  -->
    <div class="foot">
      <Footer
        :g="g"
        :f="f"
        :s="s"
        :t="t"
        :l="l"
        :page="page"
        :msg="msg"
        :msg2="msg2"
        :msg3="msg3"
        :msg4="msg4"
        :msg5="msg5"
      ></Footer>
    </div>
  </div>
</template>


<script>
import User1 from "@/components/User1.vue";
import Footer from "@/components/Footer.vue";
import { Dialog } from "vant";

export default {
  components: {
    User1,
    Footer
  },
  data() {
    return {
      msg: ["明细", "账户", "记账", "榜单", "我的"][0],
      msg2: ["明细", "账户", "记账", "榜单", "我的"][1],
      msg3: ["明细", "账户", "记账", "榜单", "我的"][2],
      msg4: ["明细", "账户", "记账", "榜单", "我的"][3],
      msg5: ["明细", "账户", "记账", "榜单", "我的"][4],
      f: "&#xe621;",
      s: "&#xe621;",
      t: "&#xe621;",
      l: "&#xe621;",
      g: "&#xe621;",
      page: "5",
      book: "",
      list: "",
      mobile: "",
      avatar_url: "",
      nickname: "",
      token: "",
      id: "",
      data: [
        { name: "我的会员", logo: "&#xe621;", arrow: "&#xe61f;" },
        { name: "邀请好友", logo: "&#xe621;", arrow: "&#xe61f;" },
        { name: "皮肤设置", logo: "&#xe621;", arrow: "&#xe61f;" }
      ],
      data2: [
        { name2: "公众号", logo2: "&#xe621;", arrow2: "&#xe61f;" },
        { name2: "联系客服", logo2: "&#xe621;", arrow2: "&#xe61f;" },
        { name2: "意见反馈", logo2: "&#xe621;", arrow2: "&#xe61f;" }
      ],
      data3: [{ name3: "退出登陆", logo3: "&#xe621;", arrow3: "&#xe61f;" }]
    };
  },
  beforeMount() {
    this.token = localStorage.getItem("user_token");
    this.id = localStorage.getItem("user_id");

    if (!this.token) {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.axios({
      method: "get",
      url:
        "http://jizhang-api-dev.it266.com/api/user/profile?token=" + this.token,
      responseType: "json"
    })
      .then(res => {
        // console.log(res);
        if (res.data.status) {
          this.mobile = res.data.data.mobile;
          this.nickname = res.data.data.nickname;
          this.avatar_url = res.data.data.avatar_url;
        } else {
          // alert("登录超时，请重新登录!");
          this.$router.push("/login");
        }
      })
      .catch(error => {
        // alert("连接超时，请重试!");
        console.log(error);
      });

    // 查询账簿
    this.axios({
      method: "get",
      url: "http://jizhang-api-dev.it266.com/api/book?token=" + this.token,
      responseType: "json"
    })
      .then(res => {
        // console.log(res.data.data.length);
        this.book = res.data.data.length;
      })
      .catch(error => {
        // alert("连接超时，请重试!");
        console.log(error);
      });

    // 查询所有记录
    this.axios({
      method: "get",
      url:
        "http://jizhang-api-dev.it266.com/api/record/account?token=" +
        this.token,
      responseType: "json",
      params: {
        begin_date: "2019-01-01",
        end_date: "2025-01-01"
      }
    })
      .then(res => {
        // console.log(res.data.data.page.itemCount)
        // console.log(res.data.data.list.length);
        this.list = res.data.data.page.itemCount;
      })
      .catch(error => {
        // alert("连接超时，请重试!");
        console.log(error);
      });
  },
  methods: {
    changeicon() {
      this.$router.push("/change");
    },
    golist() {
      this.$router.push("/mingxi");
    },
    gobook() {
      this.$router.push("/book");
    }
  }
};
</script>

<style  scoped lang="scss"  >
@import "../assets/font/iconfont.css";
.kongbai {
  height: 80px;
}

.user {
  // min-width: 1200px;
  width: 100%;
  margin: 0 auto;

  .icon {
    width: 100%;
    height: 70px;
    padding: 60px 0;
    // background-color: orange;
    background-color: #60b15b;

    .img {
      width: 70px;
      height: 70px;
      margin: 0px auto;

      border-radius: 100%;
      border: 1px solid #000;
      img {
        width: 70px;
        height: 70px;
        border-radius: 100%;
      }
    }
    .nickname {
      font-size: 14px;
      text-align: center;
      margin-top: 15px;
    }
  }

  .list {
    display: flex;
    cursor: pointer;
    // border-bottom: 1px solid #000;

    .total {
      flex-direction: row;
      flex: 1;
      text-align: center;
      // padding:50px 0;
      border-right: 1px solid #e4e7ed;
      margin: 10px 0;

      .total-color1 {
        display: block;
        padding-bottom: 10px;
        color: orange;
        font-size: 16px;
      }
      .total-color2 {
        display: block;
        padding-bottom: 10px;
        color: rgb(102, 136, 230);

        font-size: 16px;
      }
      .total-color3 {
        display: block;
        padding-bottom: 10px;
        color: rgb(121, 201, 174);
        font-size: 16px;
      }

      .total-font1 {
        font-size: 16px;
        color: rgb(114, 116, 116);
      }
      .total-font2 {
        font-size: 16px;
        color: rgb(114, 116, 116);
      }
      .total-font3 {
        font-size: 16px;
        color: rgb(114, 116, 116);
      }
    }
    .total-last {
      border: none;
    }
  }
}
</style>