<template>
  <div>
    <div class="top">
      <div class="box" v-for="(arr,index) in arr" :key="index" @click="edit(index)">
        <div class="inbox">
          {{arr.name}}
          <div class="right iconfont">&#xe61f;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["arr"],
  data() {
    return {};
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {

  },

  methods: {
    edit(index) {
      this.$emit("edit", this.arr[index].id);
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.top {
  width: 100%;
  cursor: pointer;

  .box {
    width: 100%;
    height: 70px;
    font-size: 16px;
    // color: #8e8c8c;
    line-height: 70px;
    border-bottom: 1px solid #f2f6fc;

    .inbox {
      width: 90%;
      margin: 0 auto;
    }
    .right {
      float: right;
    }
  }
}
</style>