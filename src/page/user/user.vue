<template>
  <div>
    <div class="table_seach anim">
      <input v-model="SearchTips" placeholder="请输入关键词" />
      <div class="seach">搜索</div>
    </div>
    <div class="t_box anim"><!--整个表格部分-->
      <div class="box_tit"><!--表格头部-->
        <span>用户管理</span>
        <div class="box_add" @click="goTo('/user/add')">添加</div>
        <div class="box_add">打印</div>
        <div class="box_add">导出</div>
      </div>
      <div class="box_table"><!--表格部分-->
        <table class="table table-bordered table-hover">
          <thead>
          <tr class="active">
            <th>用户名</th>
            <th>密码</th>
            <th>年龄</th>
            <th>性别</th>
            <th>生日</th>
            <th>头像</th>
            <th>家乡</th>
            <th>手机</th>
            <th>QQ</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user,index) in pageData" :key="index">
            <td>{{user.UserName}}</td>
            <td>{{user.PassWorld}}</td>
            <td>{{user.Age}}</td>
            <td>{{user.Gender==='male'?'男':'女'}}</td>
            <td>{{user.Birthday}}</td>
            <td><img class="userImg" :src="user.Picture" alt="头像"></td>
            <td>{{user.Hometown}}</td>
            <td>{{user.Phone}}</td>
            <td>{{user.QQ}}</td>
            <td>
              <div class="operation">
                <a class="op_look">查看</a>
                <a class="op_agree">编辑</a>
                <a class="op_refuse" @click="deleteUser(user.UserId)">删除</a>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="page" v-if="users.length>10"><!--页面分页-->
          <ul>
            <li style="padding: 0">
              <label>
                <select class="selectPage" v-model="pageSize">
                  <option v-for="(pageData,index) in pageDataList" :value="pageData" :key="index">每页{{pageData}}条</option>
                </select>
              </label>
            </li>
            <li @click="chengPages(1)">首页</li>
            <li v-for="i in pages" :key="i" @click="chengPages(i)" :class="{'on': pageNum ===i }" v-if="i-pageNum>-3 && i-pageNum<3">{{ i }}</li>
            <li @click="chengPages(pages)">尾页</li>
            <li><input class="choisePage" type="text" v-model="choise" @keyup.enter="chengPages(choise)"><span @click="chengPages(choise)">跳转</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapState} from "vuex";
    import {reqUserDelete} from "./../../api";
    export default {
      data(){
        return{
          pageNum : 1, //当前页数
          pageSize : 10, //每页多少条数据
          choise:'',//跳转页数
          SearchTips:'',//搜索关键词
          pageDataList:[5,10,15,20,25,30,50,100],
        }
      },
      mounted(){
        this.$store.dispatch('getUsers');
      },
      methods:{
        chengPages(number){ // 定义一个页数跳转函数
          number = number*1;
          if(number<=0){
            number = 1;
            this.choise = 1;
          }
          if(number>this.pages){
            number = this.pages;
            this.choise = this.pages;
          }
          this.pageNum = number
        },
        goTo(path){
          this.$router.replace(path);
        },
        async deleteUser(userID){
          const result = await reqUserDelete(userID);
          if(result.code === 1){
            alert(result.msg);
            window.location.href="/user";
          }
        }
      },
      computed:{
        ...mapState(['users']), //拿到所有的用户数据
        pages(){ //计算总共总共多少页
          let number = 0;
          const allUser = this.users;
          const pageSize = this.pageSize;
          number = allUser.length/pageSize;
          return Math.ceil(number);
        },
        pageData(){ //当前页显示的数据
          let users = [];
          const pageNum = this.pageNum; //当前页数
          const allUser = this.users; //所有用户
          const pageSize = this.pageSize; //每页多少条数据
          allUser.forEach((node,index)=>{
            if( index >= pageSize*(pageNum-1) && index < pageSize*pageNum){
              users.push(node)
            }
          });
          return users
        },
      },
      watch: {
        pageData(value) { //监听当前页数据，数据没有时跳转第一页
          if(value.length===0){
            this.pageNum = 1
          }
        }
      }
    }
</script>

<style scoped>
  /*整个表格的样式*/
  .t_box{
    background-color: #fff;
    width: 97%;
    margin: 20px auto;
    padding: 0 0 10px;
    position: relative;
  }
  /*表头样式*/
  .t_box .box_tit{
    border-color: #e7eaec;
    border-style: solid solid solid;
    border-width: 4px 0 1px;
    color: inherit;
    margin-bottom: 0;
    padding: 11px 23px 7px 30px;
    min-height: 48px;
  }
  .t_box .box_tit .box_add{
    color: #fff;
    border-radius: 2px;
    float: right;
    margin: 0 10px;
    padding: 2px 10px;
    background-color: rgb(0, 150, 136);
    text-align: center;
    cursor: pointer;
  }
  /*搜索框样式*/
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
    padding: 0 10px;
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
  /*表格主体样式*/
  .t_box .box_table{
    margin: 20px 30px;
  }
  thead tr th{
    color: #676a6c;
    font-size: 15px;
  }
  tbody tr td{
    color: #676a6c;
    line-height: 30px;
  }
  tbody tr td .operation{
    position: relative;
    box-sizing: border-box;
  }
  tbody tr td .operation a{
    display: inline-block;
    height: 23px;
    line-height: 23px;
    padding: 0 10px;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    font-size: 13px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
  }
  tbody tr td .operation a:hover{
    text-shadow:  0 0 1px #fff;
  }
  tbody tr td:last-child{
    width: 200px;
  }
  tbody tr td .operation .op_agree{
    background-color: #009688;
  }
  tbody tr td .operation .op_refuse{
    background-color: #FF5722;
  }
  tbody tr td .operation .op_look{
    background-color: #1D84C6;
  }
  /*定义用户头像的样式*/
  .userImg{
    width: 30px;
    height: 30px;
  }
  /*分页样式*/
  .page{
    width: 100%;
    height: 30px;
  }
  .page ul{
    display: inline-block;
    float: right;
    font-size: 0;
    -webkit-text-size-adjust:none;
  }
  .page ul li{
    width: auto;
    height: 30px;
    background-color: #009688;
    line-height: 30px;
    display: inline-block;
    padding: 0 10px;
    margin: 0 3px;
    border-radius: 3px;
    color: white;
    cursor: pointer;
    font-size: 14px;
    border: solid 1px #009688;
  }
  .on{
    background-color: white!important;
    color: #009688!important;
  }
  /*页数跳转样式*/
  .choisePage{
    width: 30px;
    height: 16px;
    margin-right:5px;
    padding-left: 3px;
    border:none 0;
    border-bottom: solid 1px white;
    background-color: #009688;
    color: white;
  }
  /*每页显示数据量select样式*/
  .selectPage{
    background-color: #009688;
    border: none 0;
    outline: none;
  }
</style>
