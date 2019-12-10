<template>
  <div class="bangdan">
    <!-- 头部 -->
    <Top :msg="ms3" :left="left"></Top>

    <!-- 底部  -->
    <div>
      <Footer
        :g="g"
        :f="f"
        :s="s"
        :t="t"
        :l="l"
        :page="page"
        :msg="msg"
        :msg2="msg2"
        :msg3="msg3"
        :msg4="msg4"
        :msg5="msg5"
      ></Footer>
    </div>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Top from "@/components/Top.vue";
import { Dialog } from "vant";

export default {
  components: {
    Footer,
    Top
  },
  data() {
    return {
      msg: ["明细", "超表", "记账", "榜单", "我的"][0],
      msg2: ["明细", "超表", "记账", "榜单", "我的"][1],
      msg3: ["明细", "超表", "记账", "榜单", "我的"][2],
      msg4: ["明细", "超表", "记账", "榜单", "我的"][3],
      msg5: ["明细", "超表", "记账", "榜单", "我的"][4],
      ms: ["一起记账", "记一笔", "影响力"][0],
      ms2: ["一起记账", "记一笔", "影响力"][1],
      ms3: ["一起记账", "记一笔", "影响力"][2],
      f: "&#xe621;",
      s: "&#xe621;",
      t: "&#xe621;",
      l: "&#xe621;",
      g: "&#xe621;",
      page: "4",
      left: "&#xe623;"
    };
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='scss' scoped>
.bangdan {
  width: 100%;
  height: 300px;
}
</style>