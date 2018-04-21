<template>
  <div class="login-wrap">
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

  mounted () {
    this.axios.get('http://localhost:7001/login').then(function(res){
      console.log(res.data)
    }).catch(function(err){
      console.log(err)
    });
  }
}
</script>

<style scoped>

</style>
