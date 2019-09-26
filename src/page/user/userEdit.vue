<template>
    <div>
      <div class="table_seach anim">
        <input placeholder="请输入关键词" />
        <div class="seach">搜索</div>
      </div>
      <div class="t_box anim">
        <div class="box_tit">
          <span>修改用户</span>
        </div>
        <div class="box_table">
          <div class="details">
            <form action="/apis/admin/user/userEdit" method="post" enctype="multipart/form-data" @submit.prevent ="addUser">
              <div class="details-item">
                <div class="details-item-l">
                  <span>用户ID</span>
                </div>
                <input disabled="disabled" name="username" v-model="userid" class="details-item-r"/>
              </div>
              <div class="details-item">
                <div class="details-item-l">
                  <span>用户名</span>
                </div>
                <input name="username" v-model="username" class="details-item-r"/>
              </div>
              <div class="details-item">
                <div class="details-item-l">
                  <span>密码</span>
                </div>
                <input type="password" name="password" v-model="password" class="details-item-r"/>
              </div>
              <div class="details-item">
                <div class="details-item-l">
                  <span>年龄</span>
                </div>
                <input name="age" v-model="age" class="details-item-r"/>
              </div>
              <div class="details-item">
                <div class="details-item-l">
                  <span>性别</span>
                </div>
                <input name="gender" v-model="gender" class="details-item-r"/>
              </div>
              <div class="details-item">
                <div class="details-item-l">
                  <span>生日</span>
                </div>
                <input name="birthday" v-model="birthday" class="details-item-r"/>
              </div>
              <div class="details-item">
                <div class="details-item-l">
                  <span>家乡</span>
                </div>
                <input name="hometown" v-model="hometown" class="details-item-r"/>
              </div>
              <div class="details-item">
                <div class="details-item-l">
                  <span>手机号</span>
                </div>
                <input name="phone" v-model="phone" class="details-item-r"/>
              </div>
              <div class="details-item">
                <div class="details-item-l">
                  <span>QQ</span>
                </div>
                <input name="qq" v-model="qq" class="details-item-r"/>
              </div>
              <div class="details-item">
                <div class="details-item-l">
                  <span>头像</span>
                </div>
                <input name="picture" @change="chooiceFile($event)" type="file" class="details-item-r"/>
              </div>
              <div class="details-result">
                <input class="result result-yes" type="submit" value="添加"/>
                <div class="result result-no" @click="goTo('/user')">取消</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {reqUserEdit} from './../../api'
  export default {
    data(){
      return{
        userid:'',
        username:'',
        password:'',
        age:'',
        gender:'',
        birthday:'',
        hometown:'',
        phone:'',
        qq:''
      }
    },
    methods:{
      goTo(path){
        this.$router.replace(path)
      },
      chooiceFile(event) {
        this.file = event.target.files[0];
      },
      async addUser(){
        const formdata = new FormData();
        formdata.append('username',this.username);
        formdata.append('password',this.password);
        formdata.append('age',this.age);
        formdata.append('gender',this.gender);
        formdata.append('birthday',this.birthday);
        formdata.append('hometown',this.hometown);
        formdata.append('phone',this.phone);
        formdata.append('qq',this.qq);
        formdata.append('picture',this.file);
        const result = await reqUserEdit(formdata);
        if(result.code===1){
          alert(result.msg);
          window.location.href='/user'
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
  /* 详情页面的表单 */
  .details{
    width: 100%;
  }
  .details-item{
    width: 100%;
    margin: 20px 0;
  }
  .details-item:after{
    clear: both;
    content: '';
    display: block;
  }
  .details-item-l{
    width: 10%;
    float: left;
    text-align: right;
    box-sizing: border-box;
    padding-right: 15px;
    line-height: 35px;
  }
  .details-item-r{
    width: 87%;
    float: left;
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
    height: 35px;
    padding: 0 10px;
    background-color:inherit;
  }
  .details-result{
    width: 100%;
  }
  .details-result:after{
    clear: both;
    content: '';
    display: block;
  }
  .result{
    width: 70px;
    line-height: 30px;
    text-align: center;
    float: left;
    margin-right: 30px;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
  }
  .result-yes{
    background-color:#009688;
    margin-left:10%;
    border: none 0;
  }
  .result-no{
    background-color:#FF5722;
  }
</style>
