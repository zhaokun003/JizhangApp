<template>
  <div>
    <div class="content-box">
      <div class="content-box-right">
        <div class="content-t">
          <span>记账金额</span>
          <input type="number" min="0" v-model="total_money" />
        </div>
      </div>
    </div>
    <div class="content-box">
      <div class="content-box-right">
        <div class="content-t">
          <span>实际金额</span>
          <input type="number" min="0" v-model="money" />
        </div>
      </div>
    </div>

    <div class="content-box">
      <div class="content-box-right">
        <div class="content-t">
          <span>日期</span>
          <input class="date" type="date" v-model="date" />
        </div>
      </div>
    </div>

    <div class="content-box">
      <div class="content-box-right">
        <div class="content-t">
          <span>交易方式</span>
          <select class="chance" v-model="account_id">
            <option :value="arr.id" v-for="(arr,index) in account_arr" :key="index">{{arr.name}}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="content-box">
      <div class="content-box-right">
        <div class="content-t">
          <span>交易对象</span>
          <input type="text" v-model="company_name" />
        </div>
      </div>
    </div>

    <div class="content-box">
      <div class="content-box-right">
        <div class="content-t">
          <span>备注</span>
          <input type="text" v-model="remark" />
        </div>
      </div>
    </div>

    <!-- 图片 -->
    <div class="contentbox">
      <div class="wai" v-for="(arr,index) in picarr" :key="index">
        <div class="boxs">
          <span class="iconfont" @click="del(index)">&#xe620;</span>
          <img :src="arr" class="pic" />
        </div>
      </div>
      <label class="wai yyy" for="female1" id="“box">
        <div class="xxx">
          <div class="boxs">
            <i class="one"></i>
            <i class="two"></i>
          </div>
        </div>
      </label>
      <input type="file" id="female1" class="display" @change="pic" />
    </div>

    <div class="btn">
      <button @click="btn">保存</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: [],
  data() {
    return {
      total_money: "",
      money: "",
      account_id: "",
      date: "",
      company_name: "",
      remark: "",
      token: "",
      account_arr: "",
      fileKey: "",
      file: "",
      picarr: [],
      keyarr: []
    };
  },

  mounted() {
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
        // console.log(this.account_arr)
        this.account_id = this.account_arr[0].id;
      })
      .catch(error => {
        alert("连接超时，请重试!");
        console.log(error);
      });

    var t = new Date();
    var y = t.getFullYear();
    var m = t.getMonth() + 1;
    var d = t.getDate();
    if (d < 10) {
      this.date = y + "-" + m + "-0" + d;
    } else {
      this.date = y + "-" + m + "-" + d;
    }
  },

  methods: {
    del(index) {
      // alert(index);
      this.picarr.splice(index, 1);
    },
    btn() {
      this.$emit("btn", {
        total_money: this.total_money,
        money: this.money,
        date: this.date,
        account_id: this.account_id,
        company_name: this.company_name,
        remark: this.remark,
        image_keys: this.keyarr
      });
    },
    pic(e) {
      // if (this.picarr.length <= 3) {
      let files = e.target.files[0];

      let params = new FormData();

      params.append("file", files);

      this.axios({
        method: "post",
        url:
          "http://jizhang-api-dev.it266.com/api/upload/image?token=" +
          this.token,
        responseType: "json",
        data: params
      })
        .then(res => {
          console.log(res);
          if (res.data.status) {
            this.file = res.data.data.file.thumbnailUrl._temp;

            this.fileKey = res.data.data.file.fileKey;

            // console.log(this.fileKey);

            this.picarr.push(this.file);
            this.keyarr.push(this.fileKey);

            // this.keyarr = res.data.data.file.fileKey;

            console.log(this.keyarr);

            if (this.picarr.length > 3) {
              document.getElementsByClassName("xxx")[0].style.display = "none";
              document.getElementsByClassName("yyy")[0].style.display = "none";
            }

            // console.log(this.picarr);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang='scss' scoped>
.btn {
  width: 90%;
  height: 40px;
  margin: 20px auto;

  button {
    width: 100%;
    border: none;
    outline: none;
    list-style: none;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    border-radius: 10px;
    background-color: #60b15b;
    color: #fff;
    cursor: pointer;
  }
}
.content-box {
  width: 90%;
  margin: 0 auto;
  height: 60px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #000;
  .content-box-right {
    height: 60px;
    float: left;
    flex-grow: 1;
    overflow: hidden;
    /*超出部分隐藏*/
    white-space: nowrap;
    color: rgb(126, 124, 124);

    .content-t {
      height: 60px;
      line-height: 60px;
      font-size: 16px;

      input {
        // border: none;
        // outline: medium;
        width: 160px;
        float: right;
        height: 30px;
        margin-top: 13px;
        text-align: right;
        line-height: 30px;
        font-size: 16px;
        border: none;
        outline: none;
        list-style: none;
        background-color: #fff;
      }

      .chance {
        float: right;
        height: 30px;
        margin-top: 13px;
        line-height: 30px;
        font-size: 16px;
        border: none;
        outline: none;
        list-style: none;
        background-color: #fff;
      }
    }
  }
}

.contentbox {
  width: 90%;
  margin: 30px auto;
  display: flex;
  flex-flow: row wrap;

  .wai {
    flex-direction: row;
    // flex: 1;
    flex: 0 0 33%;
    margin-top: 20px;
  }
  .boxs {
    width: 80px;
    height: 80px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    position: relative;
    display: block;
    margin: 0 auto;

    .iconfont {
      color: red;
      position: absolute;
      right: -7px;
      top: -7px;
    }

    .pic {
      width: 80px;
      height: 80px;
      z-index: 99;
      // position: absolute;
      display: block;
      border-radius: 6px;
      text-align: center;
    }

    .one {
      border: 1px solid #8c939d;
      text-align: center;
      margin-left: 40px;
      line-height: 80px;
      height: 20px;
    }

    .two {
      display: block;
      border: 1px solid #8c939d;
      width: 20px;
      position: absolute;
      left: 30px;
      top: 39px;
    }
  }
}

.display {
  display: none;
}
</style>