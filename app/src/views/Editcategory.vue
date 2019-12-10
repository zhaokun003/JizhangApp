<template>
  <div>
    <!-- 头部 -->
    <Top :msg="ms2" :left="left" :jizhang="jizhang" @back="back"></Top>

    <Addcategory @edit="edit" :title2="title2" :a="a"></Addcategory>
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
      ms2: "修改类别名称",
      jizhang: "1",
      left: "&#xe623;",
      type: "",
      token: "",
      category_id: "",
      a: "修改",
      title2: "修改名称"
    };
  },

  components: { Top, Addcategory },

  computed: {},

  beforeMount() {},

  mounted() {
    // 接收参数  id
    this.category_id = this.$route.query.category_id;
    // console.log(this.category_id);

    this.token = localStorage.getItem("user_token");
  },

  methods: {
    back() {
      this.$router.push("/setup");
    },
    edit(name) {
      // console.log(name)
      this.bus.$emit("loading", true);

      this.axios({
        method: "post",
        url:
          "http://jizhang-api-dev.it266.com/api/category/update?id=" +
          this.category_id +
          "&token=" +
          this.token,
        responseType: "json",
        params: {
          name: name,
          sort: 1
        }
      })
        .then(res => {
          // console.log(res);
          this.bus.$emit("loading", false);

          if (res.data.status) {
            Dialog.alert({
              message: "修改成功!"
            });
            setTimeout(() => {
              Dialog.close();
              this.$router.push("/setup");
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