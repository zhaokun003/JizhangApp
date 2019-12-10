<template>
  <div>
    <div class="content">
      <div class="box">
        <span class="left">{{editarr.name1}}</span>
        <input type="text" class="right" v-model="editarr.content1" disabled />
      </div>
    </div>
    <div class="content">
      <div class="box">
        <span class="left">{{editarr.name2}}</span>
        <input type="text" class="right" v-model="editarr.content2" disabled />
      </div>
    </div>
    <!-- 总金额 -->
    <div class="content">
      <div class="box">
        <span class="left">{{editarr2.name1}}</span>
        <!-- <input
          type="text"
          v-if="keep==2"
          class="right right-x"
          @change="change"
          v-model="editarr2.content1"
        />-->
        <input type="text" class="right" v-model="editarr2.content1" disabled />
      </div>
    </div>
    <!-- 已收已付款 -->
    <div class="content">
      <div class="box">
        <span class="left">{{editarr.name5}}</span>
        <input
          type="text"
          v-if="keep==2"
          class="right right-x"
          @change="cha"
          v-model="editarr.content5"
        />
        <input type="text" class="right" v-model="editarr.content5" disabled v-else />
      </div>
    </div>

    <!--  日期 支付账户 实际金额  图片-->
    <div class="content">
      <div class="box">
        <span class="left">{{editarr.name3}}</span>
        <input
          type="date"
          v-if="keep==2"
          class="right right-x"
          @change="cha"
          v-model="editarr.content3"
        />
        <input type="text" class="right" v-model="editarr.content3" disabled v-else />
      </div>
    </div>
    <div class="content">
      <div class="box">
        <span class="left">{{editarr.name4}}</span>
        <select v-if="keep==2" class="right right-x" @change="cha" v-model="account_id">
          <option :value="arr.id" v-for="(arr,index) in account_arr" :key="index">{{arr.name}}</option>
        </select>
        <input type="text" class="right" v-model="editarr.content4" disabled v-else />
      </div>
    </div>

    <!--  总金额 交易对象 备注 -->

    <div class="content">
      <div class="box">
        <span class="left">{{editarr2.name2}}</span>
        <input
          type="text"
          v-if="keep==2"
          class="right right-x"
          @change="change"
          v-model="editarr2.content2"
        />
        <input type="text" v-else class="right" v-model="editarr2.content2" disabled />
      </div>
    </div>
    <div class="content">
      <div class="box">
        <span class="left">{{editarr2.name3}}</span>
        <input
          type="text"
          v-if="keep==2"
          class="right right-x"
          @change="change"
          v-model="editarr2.content3"
        />
        <input type="text" v-else class="right" v-model="editarr2.content3" disabled />
      </div>
    </div>

    <div class="picture">
      <div class="pic-box" v-for="(arr,index) in images" :key="index">
        <div class="inbox">
          <!-- <span class="iconfont" @click="del(index)" v-if="keep==2">&#xe620;</span> -->

          <img :src="arr.thumbnail" alt />
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: "",
  props: ["editarr", "keep", "editarr2", "images"],
  data() {
    return {
      token: "",
      account_id: "",
      account_arr: "",
      picarr: ""
    };
  },
  created() {
    //如果没有这句代码，select中初始化会是空白的，默认选中就无法实现
    // this.account_id = this.account_arr[3].id;
    this.token = localStorage.getItem("user_token");

    // 获取账户id （支付宝，微信，现金，银行）
    this.axios({
      method: "get",
      url: "http://jizhang-api-dev.it266.com/api/account?token=" + this.token,
      responseType: "json"
    })
      .then(res => {
        // console.log(res.data.data);
        this.account_arr = res.data.data;

        this.account_id = this.editarr.account_id;

        // console.log(this.editarr.content4);
      })
      .catch(error => {
        alert("连接超时，请重试!");
        console.log(error);
      });
  },

  mounted() {},

  methods: {
    del(index) {
      // alert(index);
      this.images.splice(index, 1);
      this.picarr = this.images;

      this.$emit("del", this.picarr);
      // console.log(this.picarr);
    },
    change() {
      this.$emit("change", {
        a: this.editarr2.content1,
        b: this.editarr2.content2,
        c: this.editarr2.content3
        // d: this.editarr[index]
      });
    },
    cha() {
      this.$emit("cha", {
        date: this.editarr.content3,
        zhanghu: this.account_id,
        money: this.editarr.content5
      });
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
.picfont {
  width: 90%;
  height: 20px;
  margin: 20px auto;
}
.picture {
  width: 90%;
  height: 140px;
  margin: 20px auto;
  flex-flow: row wrap;
  align-content: flex-start;
  display: flex;
  .pic-box {
    flex: 0 0 25%;
    height: 80px;
    .inbox {
      margin: 0 auto;
      width: 80px;
      position: relative;
    }
    img {
      width: 80px;
      height: 80px;
    }
    .iconfont {
      color: red;
      position: absolute;
      right: -7px;
      top: -7px;
    }
  }
}
</style>