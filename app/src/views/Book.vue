<template>
  <div>
    <!-- 头部 -->
    <Top
      :left="left"
      :msg="ms2"
      :jizhang="jizhang"
      @back="back"
      :addaccount="addaccount"
      @add="add"
    ></Top>
    <!-- 内容 -->
    <Book :arr="arr" @detail="detail"></Book>
  </div>
</template>

<script>
import Top from "@/components/Top.vue";
import Book from "@/components/Book.vue";
import { Dialog } from "vant";

export default {
  name: "",
  props: [""],
  data() {
    return {
      jizhang: "1",
      left: "&#xe623;",
      ms2: "账本设置",
      addaccount: 1,
      token: "",
      arr: "",
      bookarr: ""
    };
  },

  components: { Top, Book },

  computed: {},

  beforeMount() {},

  mounted() {
    this.token = localStorage.getItem("user_token");
    // this.bus.$emit("loading", true);

    this.axios({
      method: "post",
      url: "http://jizhang-api-dev.it266.com/api/book?token=" + this.token,
      responseType: "json"
    })
      .then(res => {
        // this.bus.$emit("loading", false);

        this.arr = res.data.data;
        // console.log(this.arr);
      })
      .catch(error => {
        alert("连接超时，请重试！");
        console.log(error);
      });
  },

  methods: {
    back() {
      this.$router.push("/");
    },
    add() {
      this.$router.push("/addbook");
    },
    detail(val) {
      // console.log(val);
      this.$router.push({
        path: "/bookdetail",
        query: {
          val: val
        }
      });
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
</style>