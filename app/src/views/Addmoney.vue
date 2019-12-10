<template>
  <div class="add">
    <!-- <Loading v-if="isLoading"></Loading> -->

    <!-- 头部 -->
    <Top :msg="ms2" :left="left" :jizhang="jizhang" @back="back"></Top>

    <Addmoney
      @btn="btn"
      :total_money="total_money"
      :money="money"
      :account_id="account_id"
      :date="date"
      :company_name="company_name"
      :remark="remark"
      :image_keys="image_keys"
    ></Addmoney>
  </div>
</template>

<script>
import Top from "@/components/Top.vue";
import Addmoney from "@/components/Addmoney.vue";
import { Dialog } from "vant";

// import Loading from "@/components/Loading.vue";

export default {
  name: "",
  props: [""],
  data() {
    return {
      ms2: "新增记账",
      jizhang: "1",
      left: "&#xe623;",
      token: "",
      total_money: "",
      money: "",
      account_id: "",
      category_id: "",
      date: "",
      company_name: "",
      remark: "",
      image_keys: "",
      x: "",
      list: "",
      isLoading: ""
    };
  },

  components: { Top, Addmoney },

  mounted() {
    this.token = localStorage.getItem("user_token");
    this.category_id = this.$route.query.category_id;
  },

  methods: {
    back() {
      this.$router.push("/jizhang");
    },
    btn(val) {
      this.bus.$emit("loading", true);

      // console.log(val);
      this.total_money = val.total_money;
      this.money = val.money;
      this.date = val.date;
      this.x = val.account_id;
      this.company_name = val.company_name;
      this.remark = val.remark;
      this.image_keys = val.image_keys;

      this.list = this.image_keys.join(",");
      // console.log(this.list);
      // console.log(this.image_keys);

      // 记账金额/实付金额/日期 不能为空
      if (!this.total_money) {
        Dialog.alert({
          message: "记账金额不能为空！!"
        });
        setTimeout(() => {
          Dialog.close();
        }, 1000);
        this.bus.$emit("loading", false);
      } else if (this.total_money < 0) {
        Dialog.alert({
          message: "记账金额不能为负数！!"
        });
        setTimeout(() => {
          Dialog.close();
        }, 1000);
        this.total_money = false;
        this.bus.$emit("loading", false);
      }
      if (!this.money) {
        Dialog.alert({
          message: "实际金额不能为空！!"
        });
        setTimeout(() => {
          Dialog.close();
        }, 1000);
        this.bus.$emit("loading", false);
      } else if (this.money < 0) {
        Dialog.alert({
          message: "实际金额不能为负数！!"
        });
        setTimeout(() => {
          Dialog.close();
        }, 1000);
        this.money = false;
        this.bus.$emit("loading", false);
      }
      if (!this.date) {
        Dialog.alert({
          message: "日期不能为空！!"
        });
        setTimeout(() => {
          Dialog.close();
        }, 1000);
        this.bus.$emit("loading", false);
      }

      // 总金额必须大于 实际金额
      // console.log(this.total_money);
      // console.log(this.money);

      if (parseInt(this.total_money) >= parseInt(this.money)) {
        this.axios({
          method: "post",
          url:
            "http://jizhang-api-dev.it266.com/api/record/create?token=" +
            this.token,
          responseType: "json",
          params: {
            total_money: this.total_money,
            money: this.money,
            account_id: this.x,
            category_id: this.category_id,
            date: this.date,
            company_name: this.company_name,
            remark: this.remark,
            image_keys: this.list
          }
        })
          .then(res => {
            // console.log(res);
            if (res.data.status) {
              this.bus.$emit("loading", false);
              Dialog.alert({
                message: "操作成功!"
              });
              setTimeout(() => {
                Dialog.close();
              this.$router.push("/mingxi");
              }, 1000);

            } else {
              this.bus.$emit("loading", false);
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
      } else {
        Dialog.alert({
          message: "记账总金额必须大于实际金额!"
        });
        setTimeout(() => {
          Dialog.close();
        }, 1000);
        this.bus.$emit("loading", false);
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.add {
  width: 100%;
}
</style>