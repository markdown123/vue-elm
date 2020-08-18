<template>
  <div id="header-top">
    <!-- 城市首页头部 -->
    <div v-if="$store.state.headerMark === 'index'">
      <span>饿了啊</span>
      <span class="login">登录 | 注册</span>
    </div>

    <!-- 城市选择页面头部 -->
    <div v-if="$store.state.headerMark === 'city'">
      <router-link :to="'/home'">
        <i class="el-icon-arrow-left"></i>
        <span class="change-city">切换城市</span>
      </router-link>
      <span class="city-name">{{headTitle}}</span>
    </div>

    <!-- 店铺选择首页 -->
    <div v-if="$store.state.headerMark === 'shop'">
      <i class="el-icon-search"></i>
      <span class="address">{{centerItem}}</span>
      <span class="login">登录 | 注册</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["headTitle", "centerItem"],
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";

#header-top {
  position: fixed;
  top: 0;
  left: 0;
  background-color: $blue;
  z-index: 100;
  @include wh(100%, 1.95rem);

  .el-icon-search {
    color: #fff;
    @include leftitem;
    left: 0.25rem;
  }

  .address {
    @include titleCenter;
    padding-right: 1rem;
    display: inline-block;
    width: 7rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .login {
    @include itemRight;
    float: right;
    margin: 0 0 0 0.5rem;
    font-size: .65rem;

  }
}
span {
  float: left;
  color: #fff;
  font-size: 0.75rem;
  text-align: center;
  padding: 0.5rem;
}

.el-icon-arrow-left {
  color: #fff;
  @include leftitem;
}

.city-name {
  @include titleCenter;
}

.change-city {
  @include itemRight;
  font-size: 0.6rem;
  margin-top: 0.2rem;
}
</style>
