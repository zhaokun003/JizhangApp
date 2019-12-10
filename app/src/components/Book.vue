<template>
  <div>
    <div class="content" v-for="(arr,index) in arr" :key="index" @click="detail(index)">
      <div class="box">
        <div class="icon"></div>
        <span class="right">{{arr.name}}</span>
        <span class="iconfont">&#xe61f;</span>
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

  mounted() {},

  methods: {
    detail(index){
      this.$emit('detail',this.arr[index].id)
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.content {
  width: 100%;
  height: 60px;
  // background-color: #e4e7ed;
  border-bottom:1px solid #e4e7ed;

  .box {
    width: 90%;
    height: 60px;
    margin: 0 auto;

    // .icon {
    //   width: 40px;
    //   height: 60px;
    //   float: left;
    // }
    .right {
      line-height: 60px;
      font-size: 16px;
    }
    .iconfont {
      float: right;
      line-height: 60px;
    }
  }
}
</style>