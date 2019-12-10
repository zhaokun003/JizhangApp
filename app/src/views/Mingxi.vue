<template>
  <div class="mingxi">
    <!-- 头部 -->
    <Top :msg="ms" :left="left"></Top>

    <!-- 收入 支出 总计-->
    <van-list
      v-model="loading"
      :finished="finished"
      :offset="10"
      :immediate-check="false"
      finished-text="没有更多了"
      style="margin-bottom:60px"
      @load="onLoad"
    >
      <Mingxi
        :adate="adate"
        :moneyarr_in="moneyarr_in"
        :moneyarr_out="moneyarr_out"
        :listarr="listarr"
        @title="title"
        @change="change"
      ></Mingxi>
    </van-list>

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
import Top from "@/components/Top.vue";
import Mingxi from "@/components/Mingxi.vue";
import Footer from "@/components/Footer.vue";
import { Dialog } from "vant";
import { List } from "vant";

export default {
  components: {
    Footer,
    Top,
    Mingxi
  },
  data() {
    return {
      isLoading: "",
      msg: ["明细", "账户", "记账", "榜单", "我的"][0],
      msg2: ["明细", "账户", "记账", "榜单", "我的"][1],
      msg3: ["明细", "账户", "记账", "榜单", "我的"][2],
      msg4: ["明细", "账户", "记账", "榜单", "我的"][3],
      msg5: ["明细", "账户", "记账", "榜单", "我的"][4],
      ms: "一起记账",
      f: "&#xe621;",
      s: "&#xe621;",
      t: "&#xe621;",
      l: "&#xe621;",
      g: "&#xe621;",
      page: "1",
      left: "&#xe63d;",
      category_id: "",
      token: "",
      moneyarr_in: "",
      moneyarr_out: "",
      listarr: "",
      idarr: [{}],
      arr: [],
      begin_date: "",
      end_date: "",
      adate: "",
      allpage: "",
      currentPage: "",
      itemCount: "",
      loading: false,
      finished: false
    };
  },

  computed: {},

  beforeMount() {},

  mounted() {
    // window.addEventListener("scroll", this.handleScroll);

    this.adate = this.$route.query.alldate;

    this.token = localStorage.getItem("user_token");

    this.axios({
      method: "get",
      url:
        "http://jizhang-api-dev.it266.com/api/record/account?token=" +
        this.token,
      responseType: "json"
    })
      .then(res => {
        this.moneyarr_in = res.data.data.in;
        this.moneyarr_out = res.data.data.out;

        // 总页数
        this.allpage = res.data.data.page.pageCount;
        // 总个数
        this.itemCount = res.data.data.page.itemCount;

        // this.listarr = res.data.data.list;
        console.log(res.data.data.page);
      })
      .catch(error => {
        alert("连接超时，请重试");
        console.log(error);
      });

    // // --------
    this.axios({
      method: "get",
      url:
        "http://jizhang-api-dev.it266.com/api/record/real?token=" + this.token,
      responseType: "json",
      params: {
        page: 1
      }
    })
      .then(res => {
        this.listarr = res.data.data.list;
        // console.log(this.listarr);

        // console.log(res.data.data.page);
      })
      .catch(error => {
        alert("连接超时，请重试");
        console.log(error);
      });
  },

  methods: {
    onLoad() {
      // this.loading = false;
      // this.finished = true;
      // if (this.itemCount > 20) {
      setTimeout(() => {
        // this.loading = false;
        // this.finished = true;

        this.axios({
          method: "get",
          url:
            "http://jizhang-api-dev.it266.com/api/record/real?token=" +
            this.token,
          responseType: "json",
          params: {
            page: this.currentPage + 1
          }
        })
          .then(res => {
            // console.log(this.currentPage);
            if (res.data.status) {
              let lg = this.listarr.length;
              this.listarr.splice(0, lg);

              for (var i of res.data.data.list) {
                this.listarr.push(i);
              }
              console.log(this.listarr);

              // 当前页数
              this.currentPage = res.data.data.page.currentPage;
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

        this.loading = false;
        // if (this.currentPage >= this.allpage) {
        this.finished = true;
        // }
      }, 2000);
      // }
      // else {
      // this.loading = false;
      // this.finished = true;
      // }
    },

    title(val) {
      this.axios({
        method: "get",
        url:
          "http://jizhang-api-dev.it266.com/api/record/detail?id=" +
          val +
          "&token=" +
          this.token,
        responseType: "json"
      })
        .then(res => {
          // console.log(res);
          if (res.data.status) {
            // console.log(res.data.data);
            this.$router.push({
              path: "/editmingxi",
              query: { data: res.data.data, items: res.data.data.items[0] }
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
    },
    change(val) {
      // console.log(val);
      this.begin_date = val.date + "-01";
      this.end_date = val.date + "-32";

      // console.log(this.end_date);

      this.axios({
        method: "get",
        url:
          "http://jizhang-api-dev.it266.com/api/record/account?token=" +
          this.token,
        responseType: "json",
        params: {
          begin_date: this.begin_date,
          end_date: this.end_date
        }
      })
        .then(res => {
          if (res.data.status) {
            this.moneyarr_in = res.data.data.in;
            this.moneyarr_out = res.data.data.out;
            // this.listarr = res.data.data.list;
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
      // ---------------
      this.axios({
        method: "get",
        url:
          "http://jizhang-api-dev.it266.com/api/record/real?token=" +
          this.token,
        responseType: "json",
        params: {
          begin_date: this.begin_date,
          end_date: this.end_date
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.status) {
            this.listarr = res.data.data.list;
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
  }
};
</script>

<style lang='scss' scoped>
.mingxi {
  width: 100%;
  height: 300px;
}
</style>