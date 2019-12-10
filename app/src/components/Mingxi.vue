<template>
  <div>
    <!-- top -->
    <div style="height:85px"></div>

    <div class="top">
      <div class="mingxi">
        <div class="out">
          <div>本月支出（总金额）</div>
          <span class="outmoney">¥ {{moneyarr_out}}</span>
        </div>
        <div class="into">
          <div class="flex in">
            <span>本月收入</span>
            <span class="inmoney">¥ {{moneyarr_in}}</span>
          </div>
          <div class="flex date">
            <input
              class="day"
              type="month"
              @change="change"
              v-model="date"
              max="2025-01"
              min="2019-01"
            />
            <!-- <span>{{str}}</span> -->
          </div>
        </div>
      </div>
    </div>
    <div style="height:65px"></div>
    <!-- body -->
    <div>
      <div class="content" v-for="(listarr,index) in listarr" :key="index">
        <div class="box1">
          <div class="first">
            <span class="f-left">{{listarr.date}}</span>
            <span class="f-right">{{listarr.type==1?'已收入':'已支出'}} ： {{listarr.money}}</span>
          </div>
        </div>
        <div class="box2">
          <div class="title" @click="title(index)">
            <span class="t-left">{{listarr.type==1?'收入':'支出'}}</span>
            <span class="t-right">{{listarr.money}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div style="height:60px"></div> -->
  </div>
</template>

<script>
export default {
  name: "",
  props: ["listarr", "moneyarr", "moneyarr_in", "moneyarr_out"],
  data() {
    return {
      str: "",
      date: "",
      allDays: ""
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    var t = new Date();
    // 获取年份
    var year = t.getFullYear();
    // 获取月份
    var month = t.getMonth() + 1;

    this.date = year + "-" + month;
    // var d = new Date(this.date);
    // //d.getMonth()+1月份索引从0开始,天数索引从1开始，第0天即代表最后一天
    // this.allDays = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

    // console.log(this.allDays);
  },

  methods: {
    title(index) {
      this.$emit("title", this.listarr[index].record_id);
    },
    change() {
      this.$emit("change", { date: this.date });
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.top {
  width: 100%;
  height: 150px;
  position: fixed;
  top: 40px;
  left: 0;
  background-color: #60b15b;
  .mingxi {
    width: 90%;
    margin: 0 auto;
    font-size: 14px;
    color: #fff;
  }
  .out {
    padding-top: 10px;
    height: 100px;
    .outmoney {
      display: block;
      height: 70px;
      line-height: 70px;
      font-size: 30px;
    }
  }
  .inmoney {
    margin-left: 14px;
    // display: block;
    // float: right;
  }
  .into {
    display: flex;
  }
  .flex {
    flex-direction: row;
    flex: 1;
  }
}

.day {
  // background-color: #fff;
  background-color: #60b15b;
  color: #fff;
  border: none;
  outline: none;
  font-size: 16px;
}
input[type="month"]::-webkit-calendar-picker-indicator {
  display: none;
}
input[type="month"]::-webkit-clear-button {
  display: none;
}
// input[type="month"]::-webkit-inner-spin-button {
//  display:none;
//  -webkit-appearance:none;
// }
input[type="month"]::-webkit-inner-spin-button {
  // visibility: hidden;
  // display: none;
  color: #fff;
}

.content {
  width: 100%;
  .box1 {
    width: 100%;
    background-color: #f8f8f9;

    .first {
      width: 90%;
      margin: 0 auto;

      height: 25px;
      font-size: 14px;
      line-height: 25px;
      .f-right {
        float: right;
      }
    }
  }
  .box2 {
    width: 100%;

    .title {
      width: 90%;
      margin: 0 auto;
      height: 60px;

      .icon {
        width: 50px;
        height: 60px;
        line-height: 60px;
        float: left;
      }

      .t-left {
        line-height: 60px;
      }

      .t-right {
        float: right;
        line-height: 60px;
      }
    }
  }
}
</style>