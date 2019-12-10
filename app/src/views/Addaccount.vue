<template>
  <div>
    <!-- 头部 -->
    <Top :left="left" :msg="ms2" @back="back" :jizhang="jizhang"></Top>

    <!-- 内容 -->

    <Addaccount @change="change"></Addaccount>
  </div>
</template>

<script>
import Top from "@/components/Top.vue";
import Addaccount from "@/components/Addaccount.vue";
import { Dialog } from "vant";

export default {
  data() {
    return {
      left: "&#xe623;",
      ms2: "新增账户",
      jizhang: 1,

      name: "",
      type: "",
      initial_balance: "",
      remark: "",
      sort: ""
    };
  },

  components: { Top, Addaccount },

  computed: {},

  beforeMount() {},

  mounted() {
    this.token = localStorage.getItem("user_token");
  },

  methods: {
    back() {
      this.$router.push("/chaobiao");
    },
    change(val) {
      // console.log(val);
      this.bus.$emit("loading", true);

      this.name = val.name;
      this.type = val.type;
      this.initial_balance = val.initial_balance;
      this.remark = val.remark;
      this.sort = val.sort;
      if (!this.name) {
        Dialog.alert({
          message: "请填写账户名称！!"
        });
        setTimeout(() => {
          Dialog.close();
        }, 1000);
        this.bus.$emit("loading", false);
      }
      if (!this.sort) {
        Dialog.alert({
          message: "请填写排序值！!"
        });
        setTimeout(() => {
          Dialog.close();
        }, 1000);
        this.bus.$emit("loading", false);
      }
      this.axios({
        method: "post",
        url:
          "http://jizhang-api-dev.it266.com/api/account/create?token=" +
          this.token,
        responseType: "json",
        params: {
          name: this.name,
          type: this.type,
          initial_balance: this.initial_balance,
          remark: this.remark,
          sort: this.sort
        }
      })
        .then(res => {
          // console.log(res);
          this.bus.$emit("loading", false);

          if (res.data.status) {
            Dialog.alert({
              message: "添加成功!"
            });
            setTimeout(() => {
              Dialog.close();
            this.$router.push("/chaobiao");

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