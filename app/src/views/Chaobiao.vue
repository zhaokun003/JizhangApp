<template>
  <div class="chaobiao">
    <!-- 头部 -->
    <Top :left="left" :msg="ms2" @add="add" :addaccount="addaccount"></Top>

    <!--  账户 account -->
    <Chaobiao :arr="arr" @edit="edit"></Chaobiao>
    <!-- 底部  -->
    <div>
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
import Footer from "@/components/Footer.vue";
import Top from "@/components/Top.vue";
import Chaobiao from "@/components/Chaobiao.vue";
import { Dialog } from "vant";

export default {
  components: {
    Top,
    Footer,
    Chaobiao
  },
  data() {
    return {
      msg: ["明细", "超表", "记账", "榜单", "我的"][0],
      msg2: ["明细", "账户", "记账", "榜单", "我的"][1],
      msg3: ["明细", "超表", "记账", "榜单", "我的"][2],
      msg4: ["明细", "超表", "记账", "榜单", "我的"][3],
      msg5: ["明细", "超表", "记账", "榜单", "我的"][4],
      f: "&#xe621;",
      s: "&#xe621;",
      t: "&#xe621;",
      l: "&#xe621;",
      g: "&#xe621;",
      page: "2",
      left: "&#xe66b;",
      ms2: "账户管理",
      token: "",
      arr: "",
      addaccount: 1
    };
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.token = localStorage.getItem("user_token");

    this.axios({
      method: "get",
      url: this.GLOBAL.BASE_URL + "api/account?token=" + this.token,
      responseType: "json"
    })
      .then(res => {
        this.arr = res.data.data;
        // console.log(this.arr);
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

  methods: {
    add() {
      this.$router.push("/Addaccount");
    },
    edit(val) {
      // console.log(val);
      this.bus.$emit("loading", true);

      this.axios({
        method: "get",
        url:
          this.GLOBAL.BASE_URL +"api/account/detail?id=" +
          val +
          "&token=" +
          this.token,
        responseType: "json"
      })
        .then(res => {
          this.bus.$emit("loading", false);

          // console.log(res.data.data);
          if (res.data.status) {
            this.$router.push({
              path: "/editaccount",
              query: {
                name: res.data.data.name,
                type: res.data.data.type,
                remark: res.data.data.remark,
                sort: res.data.data.sort,
                id: val
              }
            });
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
.chaobiao {
  width: 100%;
  height: 300px;
}
</style>