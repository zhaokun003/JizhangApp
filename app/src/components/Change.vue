<template>
  <div>
    <div class="content-box">
      <div class="content-box-right">
        <div class="content-img">
          <span>头像</span>
          <img  :src="change.avatar_url" @click="cicon" />
        </div>
      </div>
    </div>

    <div class="content-box">
      <div class="content-box-right">
        <div class="content-t" @click="cname">
          <span>昵称</span>
          <span class="last" >{{change.nickname}}</span>
        </div>
      </div>
    </div>

    <div class="content-box" @click="cphone">
      <div class="content-box-right">
        <div class="content-t">
          <span>手机号</span>
          <span class="last" >{{change.mobile}}</span>
        </div>
      </div>
    </div>

    <div class="content-box"  @click="cpwd">
      <div class="content-box-right">
        <div class="content-t">
          <span>修改密码</span>
          <span class="last">
            <span class="iconfont" v-html="changepwd"></span>
          </span>
        </div>
      </div>
    </div>
    <div class="content-box">
      <div class="content-box-right">
        <div class="content-t">
          <span>账号ID</span>
          <span class="last">{{id}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["change", "back", "changepwd"],
  data() {
    return {
      id: ""
    };
  },

  components: {},

  mounted() {
    this.id = localStorage.getItem("user_id");
  },

  methods: {
    cicon() {
      this.$emit('cicon')
      
    },
    cname() {
      this.$emit('cname')
    },
    cpwd() {
      this.$emit("cpwd");
    },
    cphone() {
      this.$emit("cphone");
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.top {
 

  .safe {
    display: block;
    width: 100%;
    height: 50px;
    font-size: 16px;
    text-align: center;
    line-height: 150px;
  }
  .iconfont {
    cursor: pointer;
    display: block;
    width: 50px;
    height: 50px;
    font-size: 16px;
    position: absolute;
    left: 65px;
    top: 50px;
  }
}
.content-box {
  width: 90%;
  cursor: pointer;
  margin: 0 auto;
  height: 80px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #000;
  .content-box-right {
    height: 80px;
    float: left;
    flex-grow: 1;
    overflow: hidden;
    /*超出部分隐藏*/
    white-space: nowrap;
    color: rgb(126, 124, 124);

    .content-t {
      height: 80px;
      line-height: 80px;
      font-size: 16px;
      .last {
        float: right;
        .iconfont {
          font-size: 16px;
        }
      }
    }
    .content-img {
      height: 80px;
      line-height: 80px;
      font-size: 16px;

      img {
        width: 60px;
        height: 60px;
        float: right;
        margin:10px 0;
        border-radius: 100%;
      }
    }
  }
}
</style>