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
        <div class="box_add" @click="print">打印</div>
        <div class="box_add" @click="download">导出Excel</div>
        <div class="box_add" @click="showOperation = !showOperation">{{showOperation?'隐藏操作':'显示操作'}}</div>
        <div class="selectCheng" :class="{ 'hid': isHide }">
          <div class="allOption">
            <div class="optionOne" @click="isHide=!isHide">{{isHide?'筛选内容':'关闭筛选'}}</div>
            <div class="optionOne"><input type="checkbox" v-model="showUserName">&nbsp;用户名</div>
            <div class="optionOne"><input type="checkbox" v-model="showUserPasswold">&nbsp;密码</div>
            <div class="optionOne"><input type="checkbox" v-model="showUserAge">&nbsp;年龄</div>
            <div class="optionOne"><input type="checkbox" v-model="showUserGender">&nbsp;性别</div>
            <div class="optionOne"><input type="checkbox" v-model="showUserBirthday">&nbsp;生日</div>
            <div class="optionOne"><input type="checkbox" v-model="showUserImage">&nbsp;头像</div>
            <div class="optionOne"><input type="checkbox" v-model="showUserHometown">&nbsp;家乡</div>
            <div class="optionOne"><input type="checkbox" v-model="showUserPhone">&nbsp;手机</div>
            <div class="optionOne"><input type="checkbox" v-model="showUserQq">&nbsp;QQ</div>
          </div>
        </div>
      </div>
      <div class="box_table" ref="print"><!--表格部分-->
        <table class="table table-bordered table-hover">
          <thead>
          <tr class="active">
            <th v-if="showUserName">用户名</th>
            <th v-if="showUserPasswold">密码</th>
            <th v-if="showUserAge">年龄</th>
            <th v-if="showUserGender">性别</th>
            <th v-if="showUserBirthday">生日</th>
            <th v-if="showUserImage">头像</th>
            <th v-if="showUserHometown">家乡</th>
            <th v-if="showUserPhone">手机</th>
            <th v-if="showUserQq">QQ</th>
            <th v-if="showOperation">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user,index) in pageData" :key="index">
            <td v-if="showUserName">{{user.UserName}}</td>
            <td v-if="showUserPasswold">{{user.PassWorld}}</td>
            <td v-if="showUserAge">{{user.Age}}</td>
            <td v-if="showUserGender">{{user.Gender==='male'?'男':'女'}}</td>
            <td v-if="showUserBirthday">{{user.Birthday}}</td>
            <td v-if="showUserImage"><img class="userImg" :src="user.Picture" alt="头像"></td>
            <td v-if="showUserHometown">{{user.Hometown}}</td>
            <td v-if="showUserPhone">{{user.Phone}}</td>
            <td v-if="showUserQq">{{user.QQ}}</td>
            <td v-if="showOperation">
              <div class="operation">
                <a class="op_look">查看</a>
                <a class="op_agree" @click="goTo('/user/edit')">编辑</a>
                <a class="op_refuse" @click="deleteUser(user.UserId)">删除</a>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="page" v-if="users.length>8"><!--页面分页-->
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
</template>

<script>
    import {mapState} from "vuex";
    import {
      reqUserDelete,
      reqUserDownload
    } from "./../../api";
    export default {
      data(){
        return{
          pageNum : 1, //当前页数
          pageSize : 8, //每页多少条数据
          choise:'',//跳转页数
          SearchTips:'',//搜索关键词
          pageDataList:[1,3,5,6,8,10,15,20,25,30],//每页数据量数组
          showOperation:true,//是否显示操作
          isHide:true,//绑定class显示是否筛选内容
          showUserName:true,//是否显示用户名
          showUserPasswold:true,//是否显示密码
          showUserAge:true,//是否显示年龄
          showUserGender:true,//是否显示性别
          showUserBirthday:true,//是否显示生日
          showUserImage:true,//是否显示头像
          showUserHometown:true,//是否显示家乡
          showUserPhone:true,//是否显示手机号
          showUserQq:true,//是否显示QQ号
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
        },
        async download(){
          const result = await reqUserDownload();
          if(result.code === 1){
            window.location.href = result.file;
          }
        },
        print(){
          this.showOperation = false;
          setTimeout(()=>{
            const headStr = "<html><head><title></title></head><body>";
            const newStr = this.$refs.print.innerHTML;
            const footStr = "</body>";
            document.body.innerHTML = headStr + newStr + footStr;
            window.print();
            window.location.href='/user'
          },10);
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
    width: 95%;
    height: 30px;
    margin: 10px 2.5%;
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
  /*显示内容选择样式*/
  .selectCheng{
    width: auto;
    height: 23px;
    display: inline-block;
    float: right;
    background-color: rgb(0, 150, 136);
    margin: 0 10px;
    border-radius: 2px;
    cursor: pointer;
  }
  .allOption{
    background-color: rgb(0, 150, 136);
    color: white;
    border-radius: 2px;
    z-index: 1;
    position: relative;
    top: 0;
    left: 0;
  }
  .optionOne{
    border-bottom: solid 1px #00ab9b;
    padding: 0 10px;
    line-height: 23px;
  }
  .hid{
    overflow: hidden;
  }
</style>
