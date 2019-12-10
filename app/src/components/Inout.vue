<template>
  <div class="inout">
    <div class="top">
      <div class="out box">
        <span class="active getout" @click="getout" v-if="aa==1">支出</span>
        <span class="getout" @click="getout" v-else>支出</span>
      </div>

      <div class="in box">
        <span class="getin" @click="getin" v-if="bb==1">收入</span>
        <span class="getin active" @click="getin" v-else>收入</span>
      </div>
    </div>
    <!-- 支出 -->
    <div class="flex" v-if="add=='添加'">
      <div v-if="aa==1">
        <div class="content" v-for="(arr2,index) in arr2" :key="'item'+index">
          <div class="contentbox" @click="check2(index)">
            <div class="iconfont">
              <!-- <div style="width:60px;height:60px;margin:0 auto;"> -->
              &#xe61e;
              <!-- </div> -->
            </div>
            <span class="iconfont-name">{{arr2.name}}</span>
          </div>
        </div>
        <div class="content">
          <div class="contentbox add" @click="addcate(tpye=2)">
            <span class="set-icon iconfont">&#xe619;</span>
            <span class="contentboxset">添加分类</span>
          </div>
        </div>
        <div class="content">
          <div class="contentbox add" @click="setup">
            <span class="set-icon iconfont">&#xe619;</span>
            <span class="contentboxset">管理</span>
          </div>
        </div>
      </div>
      <!-- 收入 -->
      <div v-else>
        <div class="content" v-for="(arr1,index) in arr1" :key="index">
          <div class="contentbox" @click="check1(index)">
            <span class="iconfont">&#xe61e;</span>
            <span class="iconfont-name">{{arr1.name}}</span>
          </div>
        </div>
        <div class="content">
          <div class="contentbox add" @click="addcate(type=1)">
            <span class="set-icon iconfont">&#xe619;</span>
            <span class="contentboxset">添加分类</span>
          </div>
        </div>
        <div class="content">
          <div class="contentbox add" @click="setup">
            <span class="set-icon iconfont">&#xe619;</span>
            <span class="contentboxset">管理</span>
          </div>
        </div>
      </div>
    </div>
    <!-- -----------------------设置------------------------------------ -->
    <div v-if="add=='设置'">
      <div v-if="aa==1">
        <div class="contentset" v-for="(ar2,index) in arr2" :key="'item'+index">
          <div class="set">
            <span class="set-icon iconfont">&#xe621;</span>
            <span class="contentboxset">{{ar2.name}}</span>
            <span class="del" @click="delcate2(index)">删除</span>
            <span class="edit" @click="edit2(index)">修改</span>
          </div>
        </div>
      </div>
      <!-- 收入 -->
      <div v-else>
        <div>
          <div class="contentset" v-for="(ar1,index) in arr1" :key="index">
            <div class="set">
              <span class="set-icon iconfont">&#xe621;</span>
              <span class="contentboxset">{{ar1.name}}</span>
              <span class="del" @click="delcate1(index)">删除</span>
              <span class="edit" @click="edit1(index)">修改</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["a", "b", "arr1", "arr2", "add"],
  data() {
    return {
      aa: this.a,
      bb: this.b
    };
  },

  mounted() {},

  methods: {
    getin() {
      this.$emit("getin");
      this.aa = 2;
      this.bb = 2;
    },

    getout() {
      this.$emit("getout");
      this.aa = 1;
      this.bb = 1;
    },

    check2(index) {
      this.$emit("check2", this.arr2[index].id);
    },

    check1(index1) {
      this.$emit("check1", this.arr1[index1].id);
    },
    addcate(type) {
      this.$emit("addcate", type);
    },
    setup() {
      this.$emit("setup");
    },
    edit2(index) {
      this.$emit("edit2", this.arr2[index].id);
    },
    edit1(index1) {
      this.$emit("edit1", this.arr1[index1].id);
    },
    delcate2(index) {
      this.$emit("delcate2", this.arr2[index].id);
    },
    delcate1(index1) {
      this.$emit("delcate1", this.arr1[index1].id);
    }
  }
};
</script>
<style lang='scss' scoped>
.add {
  color: #303133;
  // line-height: 100px;
}
.top {
  width: 100%;
  height: 70px;
  display: flex;
  border-bottom: 1px solid rgb(112, 107, 107);
  cursor: pointer;

  .box {
    flex: 1;
    flex-direction: row;
    font-size: 16px;
    color: #8e8c8c;
  }

  .out {
    span {
      width: 100px;
      height: 66px;
      display: block;
      float: right;
      text-align: center;
      line-height: 66px;
    }
  }

  .in {
    span {
      width: 100px;
      height: 66px;
      display: block;
      text-align: center;
      line-height: 66px;
    }
  }
  .active {
    border-bottom: 4px solid green;
    color: green;
  }
}
.content {
  width: 25%;
  display: flex;
  flex-wrap: wrap;
  float: left;
  white-space: nowrap;
  overflow: hidden;
  color: #606266;
}
.contentbox {
  width: 100%;
  height: 100px;
  font-size: 14px;
  text-align: center;
  // line-height: 100px;
  // border: 1px solid rgb(177, 170, 170);
  // background-color: #EBEEF5;
  cursor: pointer;

  .iconfont {
    width: 50px;
    height: 50px;
    display: block;
    line-height: 50px;
    font-size: 30px;
    margin: 20px auto 0 auto;
    background-color: rgb(216, 217, 220);
    border-radius: 100%;
  }
  .iconfont-name {
    width: 100%;
    height: 30px;
    display: block;
    line-height: 30px;
  }

  .contentboxset {
    width: 100%;
    height: 30px;
    display: block;
    line-height: 30px;
  }
}
.contentset {
  width: 100%;
  height: 70px;
  line-height: 70px;
  .set {
    width: 90%;
    margin: 0 auto;
  }
  .set-icon {
    display: block;
    width: 40px;
    height: 70px;
    float: left;
    // text-align: center;
    // margin-right: 10px;
  }
  .edit {
    display: block;
    width: 60px;
    float: right;
    text-align: center;
    color: rgb(167, 167, 167);
  }
  .del {
    display: block;
    float: right;
    color: rgb(244, 69, 69);
  }
}
</style>