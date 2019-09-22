<template>
  <div class="header">
    <ul class="rt_nav">
      <li>
        <img class="nav_img" src="./images/default.jpg">
      </li>
      <li>
        <a class="quit_icon">
          <img src="./images/quit.png">
          <span>安全退出</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
  .header {
    background: #F3F3F4;
    height: 60px;
    border-bottom: 1px solid #e7eaec!important;
    width: 100%;
  }
  .header .rt_nav {
    float: right;
    overflow: hidden;
    margin-right: 3%;
    margin-top: 0px;
  }

  .header .rt_nav li {
    float: left;
    padding: 0 10px;
    text-align: center;
    cursor: pointer;
  }
  .header .rt_nav li .nav_img{
    width: 40px;
    height: 40px;
    margin: 10px 0px;
    border-radius: 100%;
  }
  .header .rt_nav li .quit_icon{
    display: flex;
    height: 61px;
    justify-content: center;
    align-items: center;
  }

  .header .rt_nav li .quit_icon img{
    width: 20px;
    height: 20px;
  }
  .header .rt_nav li .quit_icon span{
    color:#707070;
    margin-left: 10px;
    font-size: 13px;
  }
</style>
