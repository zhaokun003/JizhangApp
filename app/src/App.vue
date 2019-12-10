<template>
  <div id="app">
    <router-view />
    <Loading></Loading>
  </div>
</template>
<script>
// import tips from "@/components/common/tips";
import Loading from "@/components/Loading.vue";

export default {
  components: { Loading }
};
</script>

<style   lang="scss"  >
#app {
  width: 100%;
  // max-width: 1200px;
  margin: 0 auto;
}
</style>