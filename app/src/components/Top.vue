<template>
  <div>
    <div class="top">
      <div class="top-box">
        <div class="top-left" @click="gouser">
          <span class="iconfont" v-html="left"></span>
        </div>

        <div class="top-left" v-if="jizhang==1" @click="back">
          <span class="iconfont" v-html="left"></span>
          <span class="goback">返回</span>
        </div>

        <div class="top-mid">
          <span>{{msg}}</span>
          <span class="right" @click="add" v-if="addaccount==1">添加</span>
          <span class="right" @click="del" v-if="delaccount==1">删除</span>
        </div>

        <!-- <div class="right">
        </div>-->
      </div>
    </div>
    <div class="kongbai"></div>
  </div>
</template>

<script>
export default {
  props: ["msg", "left", "jizhang", "addaccount", "delaccount"],
  methods: {
    gouser() {
      this.$emit("gouser");
    },
    back() {
      this.$emit("back");
    },
    add() {
      this.$emit("add");
    },
    del() {
      this.$emit("del");
    }
  }
};
</script>

<style scoped lang="scss">
.goback {
  color: #fff;
  margin-left: 7px;
}
.kongbai {
  height: 40px;
}
.top {
  width: 100%;
  height: 40px;
  background-color: #60b15b;
  margin: 0 auto;
  // position: relative;
  position: fixed;
  top: 0;
  left: 0;
  // font-size:50px;
  .top-box {
    width: 90%;
    margin: 0 auto;
  }
  .top-left {
    z-index: 99;
    position: absolute;
    // left: 20px;
    cursor: pointer;
    // top: 40px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    .iconfont {
      font-size: 16px;
      color: rgb(255, 255, 255);
    }
  }
  .top-mid {
    width: 100%;
    height: 40px;
    // margin:0 auto;
    text-align: center;
    font-size: 16px;
    line-height: 40px;
    color: rgb(255, 255, 255);
    position: relative;
  }
}
.right {
  float: right;
  display: block;
  height: 20px;
  line-height: 20px;
  margin-top: 10px;
  // background-color: #fff;
  color: #fff;
  font-size: 16px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}
.confirm {
  float: right;
  display: block;
  // height: 20px;
  // line-height: 20px;
  // background-color: #fff;
  color: #fff;
  font-size: 16px;
  position: absolute;
  top: 0px;
  right: 0;
  cursor: pointer;
}

.confirm:hover {
  color: #fff;
}
</style>
