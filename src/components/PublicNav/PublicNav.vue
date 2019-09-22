<template>
  <div class="aside_nav">
    <div class="nav_tit flex">
      <div class="text">书</div>
    </div>
    <ul>
      <li  class="active">
        <a class="flex" href="#"> <img src="./images/dengdai.png"> <span>用户管理</span></a>
      </li>
      <li>
        <a class="flex" href="#">选项2</a>
      </li>
      <li>
        <a class="flex" href="#">选项3</a>
      </li>
      <li>
        <a class="flex" href="#">选项4</a>
      </li>
      <li>
        <a class="flex" href="#">选项5</a>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
  a{
    text-decoration: none;
  }
  a:active, a:hover {
    outline: 0;
    text-decoration: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0
  }

  td, th {
    padding: 0
  }
  ul li{
    list-style-type: none;
  }

  .flex{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .aside_nav {
    width: 210px;
    height: 100%;
    position: absolute;
    top: 0px;
    background: #2F4050;
    left: 0px;
  }
  .aside_nav .nav_tit {
    text-align: center;
    border-bottom: 1px #b6b6b6 solid;
    margin: 0;
    height: 150px;
    background-color: #233645;
  }

  .aside_nav .nav_tit .text{
    color: #fff;
    font-family:宋体;
    font-size: 30px;
    width: 70px;
    height: 70px;
    line-height: 70px;
    background-color: #67c18f;
    border-radius:100%;
    text-align: center;
  }
  .aside_nav ul{
    padding:0px ;
    margin-top: 20px;
    position: relative;
    background: #2F4050;
  }
  .aside_nav ul li {

    font-weight: bold;
    height: 45px;
    line-height: 45px;
    position: relative;

  }
  .aside_nav ul .active a{
    color: #fff;
    background-color: #293846;
  }
  .aside_nav ul li a {

    color: #a7b1c2;
    font-weight: 600;
    padding: 0 25px;
    font-size: 13px;
    letter-spacing: 2px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

  }
  .aside_nav ul li a img{
    width: 21px;
    margin-right: 5px;
  }

  .aside_nav ul li a:hover {
    color: #fff;
    text-decoration: none;
    background-color: #293846;
  }
</style>
