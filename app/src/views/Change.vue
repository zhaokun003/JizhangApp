<template>
  <div class="change">
    <Top :left="left" :msg="msg" @gouser="goback"></Top>
    <Change :change="change" :changepwd="changepwd" @cpwd="cpwd" @cphone="cphone" @cname="cname" @cicon="cicon"></Change>
  </div>
</template>

<script>
import Change from "@/components/Change.vue";
import Top from "@/components/Top.vue";
import { Dialog } from "vant";

export default {
  name: "",
  props: [""],
  data() {
    return {
      token: "",
      change: [{ avatar_url: "", nickname: "", mobile: "" }],
      left: "&#xe623;",
      id: "",
      changepwd: "&#xe61f;",
      msg: "账号安全",
      name: ""
    };
  },

  components: { Change, Top },

  mounted() {
    this.token = localStorage.getItem("user_token");
    this.id = localStorage.getItem("user_id");

    if (this.token) {
      this.axios({
        method: "get",
        url:
          "http://jizhang-api-dev.it266.com/api/user/profile?token=" +
          this.token,
        responseType: "json"
      })
        .then(res => {
          // console.log(res);
          this.change = res.data.data;
          this.name = res.data.data.nickname;
        })
        .catch(error => {
          alert("连接超时，请重试!");
          console.log(error);
        });
    } else {
      this.$router.push("/login");
    }
  },

  methods: {
    goback() {
      this.$router.push("/");
    },
    cpwd() {
      this.$router.push("/changepwd");
    },
    cphone() {
      this.$router.push("/changephone");
    },
    cname() {
      this.$router.push({
        path: "/Nickname",
        query: {}
      });
    },
    cicon(){
      // alert(1213)
      this.$router.push({path:"/Icon",
      query:{
        arr:this.change
      }});
      

    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.change {
  width: 100%;
}
</style>