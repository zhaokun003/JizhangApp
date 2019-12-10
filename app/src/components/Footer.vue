<template>
  <div class="footer">
    <div class="chat-footer-1 footer-box active" @click="first(x=1)" v-if="page==1">
      <span class="iconfont" v-html="f"></span>
      <span>{{msg}}</span>
    </div>
    <div class="chat-footer-1 footer-box" @click="first" v-else>
      <span class="iconfont" v-html="f"></span>
      <span>{{msg}}</span>
    </div>

    <div class="chat-footer-2 footer-box active" @click="second(x=2)" v-if="page==2">
      <span class="iconfont" v-html="s"></span>
      <span>{{msg2}}</span>
    </div>
    <div class="chat-footer-2 footer-box" @click="second" v-else>
      <span class="iconfont" v-html="s"></span>
      <span>{{msg2}}</span>
    </div>

    <div class="chat-footer-3 footer-box active" @click="third(x=3)" v-if="page==3">
      <span class="iconfont" v-html="t"></span>
      <span>{{msg3}}</span>
    </div>
    <div class="chat-footer-3 footer-box" @click="third" v-else>
      <span class="iconfont" v-html="t"></span>
      <span>{{msg3}}</span>
    </div>

    <!-- <div class="chat-footer-4 footer-box active" @click="four(x=4)" v-if="page==4">
      <span class="iconfont" v-html="l"></span>
      <span>{{msg4}}</span>
    </div>
    <div class="chat-footer-4 footer-box" @click="four" v-else>
      <span class="iconfont" v-html="l"></span>
      <span>{{msg4}}</span>
    </div> -->

    <div class="chat-footer-5 footer-box active" @click="five(x=5)" v-if="page==5">
      <span class="iconfont" v-html="g"></span>
      <span>{{msg5}}</span>
    </div>
    <div class="chat-footer-5 footer-box" @click="five" v-else>
      <span class="iconfont" v-html="g"></span>
      <span>{{msg5}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: [
    "f",
    "s",
    "t",
    "l",
    "g",
    "msg",
    "msg2",
    "msg3",
    "msg4",
    "msg5",
    "page"
  ],
  methods: {
    first(x) {
      if (x != 1) {
        this.$router.push({ path: "/mingxi" });
      } else {
        return false;
      }
    },
    second(x) {
      if (x != 2) {
        this.$router.push({ path: "/chaobiao" });
      } else {
        return false;
      }
    },
    third(x) {
      if (x != 3) {
        this.$router.push({ path: "/jizhang" });
      } else {
        return false;
      }
    },
    four(x) {
      if (x != 4) {
        this.$router.push({ path: "/bangdan" });
      } else {
        return false;
      }
    },
    five(x) {
      if (x != 5) {
        this.$router.push({ path: "/" });
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
// @import "../../public/css/style.css";
// @import "../../public/font/iconfont.css";
.footer {
  position: fixed;
  width: 100%;
  height: 60px;
  background-color: #fff;
  margin: 0 auto;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  color: rgb(126, 124, 124);

  .footer-box {
    flex: 1;
    // line-height: 8px;
    cursor: pointer;

    .iconfont {
      font-size: 14px;
      line-height: 40px;
      height: 30px;
      // display: block;
      text-align: center;
    }
    span {
      font-size: 14px;
      height: 30px;
      line-height: 30px;

      display: block;
      text-align: center;
    }
  }
}


.active {
  color: green;
}
</style>
