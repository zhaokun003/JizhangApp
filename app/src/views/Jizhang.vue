<template>
  <div class="jizhang">
    <!-- 头部 -->
    <Top :msg="ms2" :left="left" :jizhang="jizhang" @back="back"></Top>

    <!-- 主体   -->
    <Inout
      @check1="check1"
      @check2="check2"
      @setup="setup"
      @addcate="addcate"
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
  components: {
    Top,
    Inout
  },
  data() {
    return {
      ms: ["一起记账", "记一笔", "影响力"][0],
      ms2: ["一起记账", "记一笔", "影响力"][1],
      ms3: ["一起记账", "记一笔", "影响力"][2],
      jizhang: "1",
      left: "&#xe623;",
      token: "",
      a: 1,
      b: 1,
      arr1: "",
      arr2: "",
      outid: "",
      inid: "",
      add: "添加"
    };
  },

  mounted() {
    this.token = localStorage.getItem("user_token");
    this.getout();
  },

  methods: {
    // 支出id
    check2(val2) {
      // alert(val2);
      this.$router.push({
        path: "/addmoney",
        query: {
          category_id: val2
        }
      });
    },
    // 收入id
    check1(val1) {
      // alert(val1);
      this.$router.push({
        path: "/addmoney",
        query: {
          category_id: val1
        }
      });
    },

    back() {
      this.$router.push("/mingxi");
    },
    addcate(type) {
      // alert(type);
      this.$router.push({
        path: "/addcategory",
        query: {
          type: type
        }
      });
    },
    setup() {
      // alert(type);
      this.$router.push("/setup");
    },
    getin() {
      // 获取收入类别
      // this.bus.$emit("loading", true);

      this.axios({
        method: "get",
        url: this.GLOBAL.BASE_URL + "api/category?token=" + this.token,
        responseType: "json",
        params: {
          type: 1,
          dataType: 1
        }
      })
        .then(res => {
          // this.bus.$emit("loading", false);
          if (res.data.status) {
            this.arr1 = res.data.data;
          }

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
    },
    getout() {
      // 获取支出类别
      // this.bus.$emit("loading", true);

      this.axios({
        method: "get",
        url: this.GLOBAL.BASE_URL + "api/category?token=" + this.token,
        responseType: "json",
        params: {
          type: 2,
          dataType: 1
        }
      })
        .then(res => {
          // this.bus.$emit("loading", false);
          if (res.data.status) {
            this.arr2 = res.data.data;
          }
          // console.log(this.arr2);
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

.jizhang {
  width: 100%;
  // height: 300px;
}
</style>