<template>
  <div>
    <!-- 头部 -->
    <Top :msg="ms2" :left="left" :jizhang="jizhang" @back="back"></Top>

    <!-- 内容 -->
    <Editmingxi
      :images="images"
      :editarr="editarr"
      :editarr2="editarr2"
      :keep="keep"
      @change="change"
      @cha="cha"
      @del="del"
    ></Editmingxi>

    <!-- 底部 -->
    <Bottom @remove="remove" @changex="changex" @change2="change2" :keep="keep" @save="save"></Bottom>
  </div>
</template>

<script>
import Top from "@/components/Top.vue";
import Editmingxi from "@/components/Editmingxi.vue";
import Bottom from "@/components/Bottom.vue";
import { Dialog } from "vant";

export default {
  name: "",
  props: [""],
  data() {
    return {
      ms2: "",
      jizhang: "1",
      left: "&#xe623;",
      data: "",
      items: "",
      editarr: "",
      editarr2: "",
      id: "",
      token: "",
      keep: "",
      total_money: "",
      company_name: "",
      remark: "",
      date: "",
      money: "",
      account_id: "",
      image_keys: [],
      alldate: "",
      images: "",
      imagekeyarr: "",
      a: "",
      b: "",
      c: "",
      jump1: 100,
      jump2: 100
    };
  },

  components: { Top, Editmingxi, Bottom },

  computed: {},

  beforeMount() {},

  mounted() {
    this.token = localStorage.getItem("user_token");

    this.data = this.$route.query.data;
    this.items = this.$route.query.items;
    this.ms2 = this.data.category_name;
    // console.log(this.data);

    this.total_money = this.data.total_money;
    this.company_name = this.data.company_name;
    this.remark = this.data.remark;
    this.money = this.$route.query.items.money;
    this.account_id = this.$route.query.items.account_id;
    this.date = this.$route.query.items.date;
    if (this.$route.query.items.images.length) {
      this.imagekeyarr = this.$route.query.items.images[0].thumbnail;
    }
    // console.log(this.$route.query.items.money);

    // console.log(this.total_money);
    // console.log(this.company_name);
    // console.log(this.remark);
    // console.log(this.money);
    // console.log(this.account_id);
    // console.log(this.date);
    // console.log(this.imagekeyarr);

    this.editarr = {
      name1: "用户",
      content1: this.data.user_nickname,
      name2: "类型",
      content2: this.data.type_string,
      name3: "日期",
      content3: this.items.date,
      account_id: this.items.account_id,
      name4: "支付账户",
      content4: this.items.account_name,
      name5: "实际金额",
      content5: this.data.paid_money
    };
    this.editarr2 = {
      name1: "记账总金额",
      content1: this.data.total_money,
      name2: "交易对象",
      content2: this.data.company_name,
      name3: "备注",
      content3: this.data.remark
    };

    this.images = this.items.images;

    // console.log(this.images);
  },

  methods: {
    del(val) {
      // console.log(val);
      for (var i in val) {
        this.image_keys[i] = val[i].thumbnail;
      }

      this.imagekeyarr = this.image_keys.join(",");
      // console.log(this.imagekeyarr);
    },
    back() {
      this.$router.push("/mingxi");
    },
    remove() {
      // 获取id
      this.id = this.data.id;

      Dialog.confirm({
        title: "提示",
        message: "确定要删除吗？"
      }).then(() => {
        this.axios({
          method: "post",
          url:
            "http://jizhang-api-dev.it266.com/api/record/delete?id=" +
            this.id +
            "&token=" +
            this.token,
          responseType: "json"
        })
          .then(res => {
            if (res.data.status) {
              this.$router.push("/mingxi");
            }
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    changex() {
      this.keep = 2;
    },
    change2() {
      this.keep = 1;
    },
    save() {
      this.bus.$emit("loading", true);

      // console.log(this.imagekeyarr);
      // 修改记账
      if (this.a != false || this.b != false || this.c != false) {
        this.axios({
          method: "post",
          url:
            "http://jizhang-api-dev.it266.com/api/record/update?id=" +
            this.items.record_id +
            "&token=" +
            this.token,
          responseType: "json",
          params: {
            total_money: this.a,
            company_name: this.b,
            remark: this.c
          }
        })
          .then(res => {
            // console.log(res);
            if (res.data.status) {
              this.jump1 = 100;

              this.bus.$emit("loading", false);

              if (this.jump2 == 100) {
                Dialog.alert({
                  message: "修改成功!"
                });
                setTimeout(() => {
                  Dialog.close();
                }, 1000);
                this.$router.push("/mingxi");
              }
            } else if (res.data.data == "交易对象最少需要2个字符长度") {
              this.jump1 = 1;
              this.bus.$emit("loading", false);
              Dialog.alert({
                message: "交易对象最少需要2个字符长度!"
              });
              setTimeout(() => {
                Dialog.close();
              }, 1000);
            } else if (res.data.data == "总金额不能小于已收或已付金额") {
              this.jump1 = 1;

              this.bus.$emit("loading", false);
              Dialog.alert({
                message: "总金额不能小于已收或已付金额!"
              });
              setTimeout(() => {
                Dialog.close();
              }, 1000);
            } else {
              this.bus.$emit("loading", false);
            }
          })
          .catch(error => {
            console.log(error);
            this.bus.$emit("loading", false);
          });
      }

      // 修改记账（单条明细）
      if (
        this.money != false ||
        this.account_id != false ||
        this.alldate != false
      ) {
        this.axios({
          method: "post",
          url:
            "http://jizhang-api-dev.it266.com/api/record/item/update?itemId=" +
            this.items.id +
            "&token=" +
            this.token,
          responseType: "json",
          params: {
            money: this.money,
            account_id: this.account_id,
            date: this.alldate,
            image_keys: this.imagekeyarr
          }
        })
          .then(res => {
            // console.log(res);
            if (res.data.status) {
              this.jump2 = 100;

              this.bus.$emit("loading", false);

              // alert("修改记帐单条记录成功!");
              if (this.jump1 == 100) {
                Dialog.alert({
                  message: "修改成功!"
                });
                setTimeout(() => {
                  Dialog.close();
                }, 1000);
                this.$router.push({
                  path: "/mingxi",
                  query: {
                    alldate: this.alldate
                  }
                });
              }
            } else if (res.data.data == "已收已付合计不能大于帐面金额") {
              this.jump2 = 1;
              Dialog.alert({
                message: "已收已付合计不能大于帐面金额!"
              });
              setTimeout(() => {
                Dialog.close();
              }, 1000);
              this.bus.$emit("loading", false);

              // alert("修改记帐单条记录失败！");
            } else {
              this.jump2 = 1;
              this.bus.$emit("loading", false);
            }
          })
          .catch(error => {
            console.log(error);
            this.bus.$emit("loading", false);
          });
      }

      // console.log(this.a);
      // console.log(this.b);
      // console.log(this.c);
      // console.log(this.alldate);
      // console.log(this.account_id);
      // console.log(this.money);
    },
    change(val) {
      // 总金额 交易对象 备注
      // this.total_money = val.a;
      // this.company_name = val.b;
      // this.remark = val.c;

      this.a = val.a;
      this.b = val.b;
      this.c = val.c;
    },
    cha(val) {
      this.alldate = val.date;
      this.account_id = val.zhanghu;
      this.money = val.money;
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
</style>