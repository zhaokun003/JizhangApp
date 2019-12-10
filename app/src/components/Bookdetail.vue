<template>
  <div>
    <div class="content">
      <div class="box">
        <span class="left">账簿名称</span>
        <input type="text" class="right" v-model="bookarr.name" v-if="c==1" disabled />
        <input type="text" class="right" v-model="bookarr.name" @change="cha" v-else maxlength="10" />
      </div>
    </div>

    <div class="content">
      <div class="box">
        <span class="left">账簿ID</span>
        <input type="text" class="right" v-model="bookarr.id" disabled />
      </div>
    </div>

    <div class="content">
      <div class="box">
        <span class="left">拥有者</span>
        <input type="text" class="right" v-model="bookarr.user_name" disabled />
      </div>
    </div>
    <div class="content">
      <div class="box">
        <span class="left">账簿创建者</span>
        <input type="text" class="right" v-model="bookarr.user_id" disabled />
      </div>
    </div>
    <div class="btn" @click="main">
      <span>设置为主账簿</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["bookarr", "c"],
  data() {
    return {};
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    cha() {
      this.$emit("cha", {
        name: this.bookarr.name,
        id: this.bookarr.id
      });
    },
    main() {
      this.$emit("main",  this.bookarr.id);
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.content {
  width: 100%;
  // background-color: orange;

  .box {
    width: 90%;
    height: 50px;
    margin: 0 auto;
    border-bottom: 1px solid rgb(206, 203, 203);
    .left {
      display: block;
      height: 50px;
      line-height: 50px;
      float: left;
    }
    .right {
      width: 160px;
      float: right;
      height: 30px;
      margin-top: 10px;
      text-align: right;
      line-height: 30px;
      font-size: 16px;
      border: none;
      outline: none;
      list-style: none;
      background-color: #fff;
    }
    .right-x {
      color: red;
    }
  }
}
.btn {
  width: 90%;
  height: 100px;
  margin: 0 auto;
  line-height: 100px;
  text-align: right;
  color: #fff;
  span {
    padding: 5px;
    background-color: #60b15b;
    border-radius: 5px;
  }
}
</style>