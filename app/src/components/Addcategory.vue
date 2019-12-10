<template>
  <div>
    <div class="type" v-if="a=='添加'">
      <div class="inbox">
        <div class="box">
          <span class="flex">{{title}}:</span>
          <input class="flex" type="text" v-model="content" maxlength="6" placeholder="最多6个字的长度" />
        </div>
      </div>
      <div class="btn">
        <button class="add" @click="add">保存</button>
      </div>
    </div>

    <div class="type" else v-if="a=='修改'">
      <div class="box">
        <span class="flex">{{title2}}:</span>
        <input class="flex" type="text" v-model="editname" maxlength="6" placeholder="最多6个字的长度" />
      </div>
      <div class="btn">
        <button class="add" @click="edit">保存修改</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["title", "a", "title2"],
  data() {
    return {
      content: "",
      editname: ""
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    add() {
      this.$emit("add", this.content);
    },
    edit() {
      this.$emit("edit", this.editname);
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.type {
  width: 100%;
  .inbox{
    width: 100%;
  }
  .box {
    width: 90%;
    height: 40px;
    line-height: 40px;
    margin: 40px auto;
    // padding: 40px 0;
    display: flex;
    border-bottom:1px solid rgb(201, 198, 198);

    .flex {
      flex-direction: row;
    }
    span {
      display: block;
      // width: 80px;
      // float: left;
      white-space: nowrap;

      flex: 1;
    }
    input {
      flex: 5;
      white-space: nowrap;
      // width: 70%;
      height: 40px;
      line-height: 40px;
      // margin-left: 10px;
      text-align: center;
      font-size: 16px;
      outline: none;
      border: 0;
    }
  }
  .btn {
    padding: 20px 0;
    width: 90%;
    margin: 0px auto;
    .add {
      height: 50px;
      width: 100%;
      border-radius: 100px;
      color: #fff;
      background-color: rgb(87, 176, 108);
      border: 0;
      font-size: 16px;
      cursor: pointer;
      outline: none;
      box-shadow: none;
    }
  }
}
</style>