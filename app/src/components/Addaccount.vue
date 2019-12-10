<template>
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
        <!-- <input type="text" v-model="type" /> -->
        <select v-model="type">
          <option :value="1">现金</option>
          <option :value="2">银行</option>
          <option :value="3">支付平台</option>
          <option :value="4">其他</option>
        </select>
      </div>
    </div>
    <div class="content">
      <div class="left">期初余额</div>
      <div class="right">
        <input type="text" v-model="initial_balance" placeholder="可不填，默认为0" />
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
    <div class="btn" @click="change">
      <span>提交</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: [],
  data() {
    return {
      name: "",
      type: "1",
      initial_balance: "",
      remark: "",
      sort: "10"
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    change() {
      this.$emit("change", {
        name: this.name,
        type: this.type,
        initial_balance: this.initial_balance,
        remark: this.remark,
        sort: this.sort
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