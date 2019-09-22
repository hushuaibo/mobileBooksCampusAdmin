<template>
  <div class="table_seach anim">
    <input placeholder="请输入关键词" />
    <div class="seach">搜索</div>
  </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
  .table_seach{
    width: 97%;
    margin: 20px auto;
  }
  .anim{
    transform: translateX(0px);
    opacity: 1;
    animation-fill-mode: forwards;
  }
  .table_seach:after {
    display: block;
    clear: both;
    content: '';
  }
  .table_seach input{
    width: 200px;
    height: 35px;
    line-height: 35px;
    border: 1px solid #e6e6e6;
    background-color: #fff;
    border-radius: 2px;
    padding: 0px 10px;
    float: left;
  }
  .table_seach .seach{
    height: 35px;
    line-height: 35px;
    padding: 0 18px;
    background-color: #009688;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    font-size: 14px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    margin-left: 10px;
    float: left;
  }
</style>
