<template>
  <div>
    <!-- 头部 -->
    <Top :left="left" :msg="ms2" @gouser="gouser" @del="del" :delaccount="delaccount"></Top>
    <!-- 内容 -->
    <!-- <Editaccount :arr="arr"></Editaccount> -->
    <div>
      <div class="content">
        <div class="left">账户名称</div>
        <div class="right">
          <input type="text" v-model="name" />
        </div>
      </div>

      <div class="content">
        <div class="left">账户类型</div>
        <div class="right">
          <select v-model="type">
            <option :value="1">现金</option>
            <option :value="2">银行</option>
            <option :value="3">支付平台</option>
            <option :value="4">其他</option>
          </select>
        </div>
      </div>

      <div class="content">
        <div class="left">备注</div>
        <div class="right">
          <input type="text" v-model="remark" placeholder="可不填" />
        </div>
      </div>
      <div class="content">
        <div class="left">排序值</div>
        <div class="right">
          <input type="text" v-model="sort" />
        </div>
      </div>

      <div class="btn" @click="save">
        <span>保存</span>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "@/components/Top.vue";
// import Editaccount from "@/components/Editaccount.vue";
import { Dialog } from "vant";

export default {
  name: "",
  props: [""],
  data() {
    return {
      left: "&#xe623;",
      ms2: "编辑",
      name: "",
      type: "",
      remark: "",
      sort: "",
      arr: "",
      id: "",
      token: "",
      delaccount: "1"
    };
  },

  components: { Top },

  computed: {},

  beforeMount() {},

  mounted() {
    this.token = localStorage.getItem("user_token");

    this.name = this.$route.query.name;
    this.type = this.$route.query.type;
    this.remark = this.$route.query.remark;
    this.sort = this.$route.query.sort;
    this.id = this.$route.query.id;

    this.arr = {
      name: this.name,
      type: this.type,
      remark: this.remark,
      sort: this.sort
    };
  },

  methods: {
    del() {
      Dialog.confirm({
        title: "提示",
        message: "确定要删除吗？"
      }).then(() => {
        this.axios({
          method: "post",
          url:
            "http://jizhang-api-dev.it266.com/api/account/delete?id=" +
            this.id +
            "&token=" +
            this.token,
          responseType: "json"
        }).then(res => {
          // console.log(res);
          this.bus.$emit("loading", false);

          if (res.data.status) {
            this.$router.push("/chaobiao");
          }
        });
      });
    },
    gouser() {
      this.$router.push("/chaobiao");
    },
    save() {
      // console.log(123)

      // console.log(this.id);
      this.bus.$emit("loading", true);

      this.axios({
        method: "post",
        url:
          "http://jizhang-api-dev.it266.com/api/account/update?id=" +
          this.id +
          "&token=" +
          this.token,
        responseType: "json",
        params: {
          name: this.name,
          type: this.type,
          remark: this.remark,
          sort: this.sort
        }
      }).then(res => {
        // console.log(res);
        this.bus.$emit("loading", false);

        if (res.data.status) {
          Dialog.alert({
            message: "修改成功！!"
          });
          setTimeout(() => {
            Dialog.close();
            this.$router.push("/chaobiao");
          }, 1000);
        }
      });
    }
  },

  watch: {}
};
</script>

<style lang='scss' scoped>
.content {
  width: 90%;
  height: 60px;
  line-height: 60px;
  margin: 0 auto;
  border-bottom: 1px solid #ebeef5;
  .left {
    float: left;
  }

  .right {
    float: right;

    input {
      width: 200px;
      text-align: right;
      background-color: #fff;
      height: 30px;
      border: 1px solid #f2f6fc;
      outline: none;
      box-shadow: none;
    }
    select {
      // width: 200px;
      text-align: right;
      background-color: #fff;
      height: 30px;
      border: 1px solid #f2f6fc;
      outline: none;
      box-shadow: none;
    }
  }
}
.btn {
  width: 90%;
  height: 40px;
  margin: 20px auto;
  background-color: #60b15b;
  line-height: 40px;
  border-radius: 10px;
  cursor: pointer;
  span {
    width: 50px;
    display: block;
    color: #fff;
    font-size: 16px;
    margin: 0 auto;
  }
}
</style>