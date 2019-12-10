<template>
  <div>
    <!-- 头部 -->
    <Top :msg="ms2" :left="left" :jizhang="jizhang" @back="back"></Top>
    <Inout
      @edit1="edit1"
      @edit2="edit2"
      @delcate1="delcate1"
      @delcate2="delcate2"
      @getin="getin"
      @getout="getout"
      :a="a"
      :b="b"
      :arr1="arr1"
      :arr2="arr2"
      :add="add"
    ></Inout>
  </div>
</template>

<script>
import Top from "@/components/Top.vue";
import Inout from "@/components/Inout.vue";
import { Dialog } from "vant";

export default {
  name: "",
  props: [""],
  data() {
    return {
      ms2: "个人账本-类别管理",
      jizhang: "1",
      left: "&#xe623;",
      token: "",
      a: 1,
      b: 1,
      arr1: "",
      arr2: "",
      outid: "",
      inid: "",
      add: "设置"
    };
  },

  components: { Top, Inout },

  computed: {},

  beforeMount() {},

  mounted() {
    this.token = localStorage.getItem("user_token");
    this.getout();
  },

  methods: {
    // 获取修改的 支出 / 收入 id
    edit2(val2) {
      // alert(val2);
      this.$router.push({
        path: "/editcategory",
        query: {
          category_id: val2
        }
      });
    },
    edit1(val1) {
      // alert(val1);
      this.$router.push({
        path: "/editcategory",
        query: {
          category_id: val1
        }
      });
    },
    delcate2(val2) {
      var id2 = val2;

      Dialog.confirm({
        title: "提示",
        message: "确定要删除吗？"
      }).then(() => {
        this.bus.$emit("loading", true);

        this.axios({
          method: "post",
          url:
            "http://jizhang-api-dev.it266.com/api/category/delete?id=" +
            id2 +
            "&token=" +
            this.token,
          responseType: "json"
        })
          .then(res => {
            // console.log(res);
            this.bus.$emit("loading", false);

            if (res.data.status) {
              this.getout();
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
      });
    },
    delcate1(val1) {
      var id1 = val1;
      Dialog.confirm({
        title: "提示",
        message: "确定要删除吗？"
      }).then(() => {
        this.bus.$emit("loading", true);

        this.axios({
          method: "post",
          url:
            "http://jizhang-api-dev.it266.com/api/category/delete?id=" +
            id1 +
            "&token=" +
            this.token,
          responseType: "json"
        })
          .then(res => {
            // console.log(res);
            this.bus.$emit("loading", false);

            if (res.data.status) {
              this.getin();
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
      });
    },
    back() {
      this.$router.push("/jizhang");
    },
    getout() {
      // 获取支出类别
      this.bus.$emit("loading", true);

      this.axios({
        method: "get",
        url:
          "http://jizhang-api-dev.it266.com/api/category?token=" + this.token,
        responseType: "json",
        params: {
          type: 2,
          dataType: 1
        }
      })
        .then(res => {
          this.bus.$emit("loading", false);

          this.arr2 = res.data.data;
          // console.log(this.arr2);
        })
        .catch(error => {
          Dialog.alert({
            message: "连接超时，请重试!"
          });
          setTimeout(() => {
            Dialog.close();
          }, 1000);
          alert("连接超时，请重试!");
          console.log(error);
        });
    },
    getin() {
      // 获取收入类别
      this.bus.$emit("loading", true);

      this.axios({
        method: "get",
        url:
          "http://jizhang-api-dev.it266.com/api/category?token=" + this.token,
        responseType: "json",
        params: {
          type: 1,
          dataType: 1
        }
      })
        .then(res => {
          this.bus.$emit("loading", false);

          this.arr1 = res.data.data;

          // console.log(this.arr1);
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
@import "../assets/font/iconfont.css";
</style>