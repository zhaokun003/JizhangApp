<template>
  <div>
    <!-- 头部 -->
    <Top :left="left" :msg="ms2" :jizhang="jizhang" @back="back"></Top>

    <!-- zhuti -->
    <Bookdetail :bookarr="bookarr" :c="c" @cha="cha" @main="main"></Bookdetail>

    <!-- 底部 -->
    <Bottom @changex="changex" :keep="keep" @change2="change2" @remove="remove" @save="save"></Bottom>
  </div>
</template>

<script>
import Top from "@/components/Top.vue";
import Bookdetail from "@/components/Bookdetail.vue";
import Bottom from "@/components/Bottom.vue";
import { Dialog } from "vant";

export default {
  name: "",
  props: [""],
  data() {
    return {
      jizhang: "1",
      left: "&#xe623;",
      ms2: "我的账簿",
      token: "",
      bookarr: "",
      val: "",
      keep: "",
      c: 1,
      bookid: "",
      bookname: ""
    };
  },

  components: { Top, Bookdetail, Bottom },

  computed: {},

  beforeMount() {},

  mounted() {
    this.token = localStorage.getItem("user_token");

    this.val = this.$route.query.val;
    // console.log(this.val);
    this.bus.$emit("loading", true);

    this.axios({
      method: "get",
      url:
        "http://jizhang-api-dev.it266.com/api/book/detail?token=" + this.token,
      responseType: "json",
      params: {
        book_id: this.val
      }
    })
      .then(res => {
        // console.log(res);
        this.bus.$emit("loading", false);

        if (res.data.status) {
          this.bookarr = {
            id: res.data.data.id,
            user_id: res.data.data.user_id,
            name: res.data.data.name,
            user_name: res.data.data.user_name
          };
          // console.log(this.bookarr);
        } else {
          Dialog.alert({
            message: "您不允许访问该账簿"
          });

          setTimeout(() => {
            Dialog.close();
          }, 1000);
          // alert("您不允许访问该账簿!");
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
    back() {
      this.$router.push("/book");
    },
    changex() {
      this.keep = 2;
      this.c = 2;
    },
    change2() {
      this.keep = 1;
      this.c = 1;
    },
    remove() {
      Dialog.confirm({
        title: "提示",
        message: "确定要删除吗？"
      }).then(() => {
        this.bus.$emit("loading", true);

        this.axios({
          method: "post",
          url:
            "http://jizhang-api-dev.it266.com/api/book/delete?token=" +
            this.token,
          responseType: "json",
          params: {
            book_id: this.val
          }
        })
          .then(res => {
            // console.log(res);
            this.bus.$emit("loading", false);

            if (res.data.status) {
              this.$router.push("/book");
            } else if (res.data.data == "不允许删除默认帐薄") {
              // alert("不允许删除默认帐薄");
              Dialog.alert({
                message: "不允许删除默认帐薄"
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
      });
    },
    cha(val) {
      this.bookid = val.id;
      this.bookname = val.name;
    },
    save() {
      this.bus.$emit("loading", true);

      if (this.bookid != false || this.bookname != false) {
        this.axios({
          method: "post",
          url:
            "http://jizhang-api-dev.it266.com/api/book/update?token=" +
            this.token,
          responseType: "json",
          params: {
            book_id: this.bookid,
            book_name: this.bookname
          }
        })
          .then(res => {
            // console.log(res);
            this.bus.$emit("loading", false);

            if (res.data.status) {
              Dialog.alert({
                message: "修改成功"
              });
              setTimeout(() => {
                Dialog.close();
              }, 1000);
              this.$router.push("/book");
            } else if (res.data.data == "帐薄名不能超过10个字符") {
              Dialog.alert({
                message: "帐薄名不能超过10个字符"
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
      if (this.bookname == false) {
        this.bus.$emit("loading", false);
        Dialog.alert({
          message: "修改成功"
        });
        setTimeout(() => {
          Dialog.close();
        }, 1000);

        this.$router.push("/book");
      }
    },
    main(val) {
      // console.log(val);
      this.bus.$emit("loading", true);

      this.axios({
        method: "post",
        url:
          "http://jizhang-api-dev.it266.com/api/book/set-default?token=" +
          this.token,
        responseType: "json",
        params: {
          book_id: val
        }
      })
        .then(res => {
          // console.log(res);
          this.bus.$emit("loading", false);

          if (res.data.status) {
            Dialog.alert({
              message: "设置成功！"
            });
            setTimeout(() => {
              Dialog.close();
            }, 1000);

            this.$router.push("/book");
          } else {
            Dialog.alert({
              message: "设置失败"
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
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
</style>