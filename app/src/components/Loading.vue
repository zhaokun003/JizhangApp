<template>
  <div>
    <div class="loading" v-show="loading">
      <img src="../assets/img/loading.gif" />
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: [""],
  data() {
    return {
      loading: false
    };
  },
  created() {
    var that = this;
    this.bus.$on("loading", function(data) {
      that.loading = !!data;
    });
  },
  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='scss'>
// .loading {
//   position: fixed;
//   left: 0;
//   top: 0;
//   background: url("loading.gif") center center no-repeat #fff;
//   width: 100vw;
//   height: 100vh;
//   z-index: 1000;
// }

// .fade-enter,
// .fade-leave-active {
//   opacity: 0;
// }

// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 2s;
// }

.loading {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
  p {
    padding: 0.15rem 0.15rem 0.2rem;
    color: #fff;
    font-size: 50px;
  }
  img {
    width: 50px;
    height: 50px;
  }
}
</style>