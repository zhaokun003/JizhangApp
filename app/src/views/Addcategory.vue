<template>
  <div>
    <!-- 头部 -->
    <Top :msg="ms2" :left="left" :jizhang="jizhang" @back="back"></Top>
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
      ms2: "",
      jizhang: "1",
      left: "&#xe623;",
      type: "",
      token: "",
      parent_id: "",
      name: "",
      sort: "",
      category_id: "",
      title: "添加分类",
      a: "添加"
    };
  },

  components: { Top, Addcategory },

  computed: {},

  beforeMount() {},

  mounted() {
    // 接收参数，收入1 /  支出2
    this.type = this.$route.query.type;
    if (this.type == 1) {
      this.ms2 = "添加-收入-分类";
    } else {
      this.ms2 = "添加-支出-分类";
    }
    // console.log(this.type);

    this.token = localStorage.getItem("user_token");
  },

  methods: {
    back() {
      this.$router.push("/jizhang");
    },
    add(val) {
      // console.log(val);
      this.bus.$emit("loading", true);

      this.axios({
        method: "post",
        url:
          "http://jizhang-api-dev.it266.com/api/category/create?token=" +
          this.token,
        responseType: "json",
        params: {
          parent_id: 0,
          type: this.type,
          name: val,
          sort: 1
        }
      })
        .then(res => {
          // console.log(res);
          this.bus.$emit("loading", false);

          if (res.data.status) {
            this.category_id = res.data.data.id;

            Dialog.alert({
              message: "添加成功"
            });
            setTimeout(() => {
              Dialog.close();
              this.$router.push("/jizhang");
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
</style>