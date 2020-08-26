<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  created() {
    if(sessionStorage.getItem('shoplist') !== '') {
      this.$store.commit('EventListener')
    }
  }

}
</script>

<style>

</style>
