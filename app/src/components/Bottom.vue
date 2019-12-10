<template>
  <div class="bottom">
    <div class="footer" v-if="keep==2">
      <div class="flex left">
        <div class="left-2" @click="change2">
          <span>取消</span>
        </div>
      </div>
      <div class="flex right">
        <div class="right-2" @click="save">
          <span>保存</span>
        </div>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="footer" v-else>
      <div class="flex left">
        <div class="left-2" @click="changex">
          <span>编辑</span>
        </div>
      </div>
      <div class="flex right">
        <div class="right-2" @click="remove">
          <span>删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

 

<script>
export default {
  props: ["keep"],
  data() {
    return {};
  },

  mounted() {},

  methods: {
    remove() {
      this.$emit("remove");
    },
    changex() {
      this.$emit("changex");
    },
    change2() {
      this.$emit("change2");
    },
    save() {
      this.$emit("save");
    }
  }
};
</script>
<style lang='scss' scoped>
.bottom {
  width: 100%;
  height: 60px;
  background-color: #60b15b;
  position: fixed;
  left: 0;
  bottom: 0;
  color: #fff;
  font-size: 16px;
  .footer {
    display: flex;
    .flex {
      height: 60px;
      flex-direction: row;
      flex: 1;
      // border: 1px solid #000;
    }
    .left-2 {
      width: 90%;
      margin: 10px auto;
      height: 40px;
      border-radius: 5px;
      border: 1px solid #fff;
      line-height: 40px;
      text-align: center;
    }
    .right-2 {
      width: 90%;
      margin: 10px auto;
      height: 40px;
      border-radius: 5px;
      border: 1px solid #fff;
      line-height: 40px;
      text-align: center;
    }
  }
}
</style>