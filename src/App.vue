<template>
  <div>
    <PublicNav/>
    <div class="wrap">
      <Header/>
      <div class="tables">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import PublicNav from './components/PublicNav/PublicNav.vue'
import Header from './components/Header/Header.vue'
export default {
  components:{
    PublicNav,
    Header
  }
}
</script>

<style>
  body{
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.42857143;
    color: #333;
    background-color: #fff;
  }
  li{
    list-style-type: none;
  }
  a{
    text-decoration: none;
    color: #000000;
  }
  input{
    outline: none;
  }
  .wrap {
    width: auto;
    height: 100%;
    position: fixed;
    top: 0;
    left: 210px;
    right: 0;
    bottom: 0;
  }
  .tables{
    width: 100%;
    margin: 0;
    height: calc(100% - 70px);
    background-color: #F3F3F4;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
