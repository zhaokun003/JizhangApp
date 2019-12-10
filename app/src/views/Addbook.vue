<template>
  <div>
    <!-- 头部 -->
    <Top :left="left" :msg="ms2" :jizhang="jizhang" @back="back"></Top>

    <!-- 主体 -->
    <Addcategory @add="add" :title="title" :a="a"></Addcategory>
  </div>
</template>

<script>
import Top from "@/components/Top.vue";
import Addcategory from "@/components/Addcategory.vue";
import { Dialog } from "vant";

export default {
  name: "",
  props: [""],
  data() {
    return {
      jizhang: "1",
      left: "&#xe623;",
      ms2: "新增账本",
      a: "添加",
      title: "账簿名称",
      token: ""
    };
  },

  components: { Top, Addcategory },

  computed: {},

  beforeMount() {},

  mounted() {
    this.token = localStorage.getItem("user_token");
  },

  methods: {
    back() {
      this.$router.push("/book");
    },
    add(val) {
      this.bus.$emit("loading", true);

      this.axios({
        method: "post",
        url:
          "http://jizhang-api-dev.it266.com/api/book/create?token=" +
          this.token,
        responseType: "json",
        params: {
          name: val
        }
      })
        .then(res => {
          // console.log(res);
          this.bus.$emit("loading", false);

          if (res.data.status) {
            Dialog.alert({
              message: "添加成功"
            });
            setTimeout(() => {
              Dialog.close();
              this.$router.push("/book");
            }, 1000);
            // alert("添加成功");
          } else if (res.data.data == "您的帐号最多允许创建2个帐薄") {
            Dialog.alert({
              message: "您的帐号最多允许创建2个帐薄"
            });
            setTimeout(() => {
              Dialog.close();
              this.$router.push("/book");
            }, 1000);
            // alert("您的帐号最多允许创建2个帐薄");
          } else {
          }
        })
        .catch(error => {
          // alert("连接超时，请重试！");
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