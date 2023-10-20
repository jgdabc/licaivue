<template>
<!--头部-->
<div class="public-head">
    <div class="public-head-nav">
      <div class="public-head-left">
        <h1 class="public-head-logo"><a href="javascript:;">
          <img src="@/assets/image/logo.png" alt="">
        </a></h1>
        <ul class="public-head-list">
          <li><a href="/" >主页</a></li>
          <li class="public-head-hover">
            <a href="javascript:void(0);">我要投资</a>
            <!--二级导航-->
            <div class="two-title">
              <a href="/product/list?type=1">优选类产品</a>
              <a href="/product/list?type=2">散标类产品</a>
            </div>
          </li>
          <li><a href="user_center.html" target="_blank">借款人信息</a></li>
          <li><a href="javascript:;" target="_blank">信息披露</a></li>
          <li><a href="javascript:;" target="_blank">安全计划</a></li>
        </ul>
      </div>
      <div class="public-head-right">
        <a href="/user/login" target="_blank">登录</a>
        <a href="/user/register" target="_blank">注册</a>
        <a v-show="showReal" href="/user/real" target="_blank">实名认证</a>
        <a v-show="!showReal" href="" target="_blank">{{name}}</a>

        
      </div>
    </div>
  </div>
  <!--end-->


</template>
<script>
import { doGet } from '@/http/httpRequest';

export default{
    name : "AppHeader",
    data(){
      return{
        name: "",
        showReal:true
      }
    },
    mounted(){
      this.loadRealName();

    },
   
    methods:{
      loadRealName(){
        doGet("/loadRealName").then((resp)=>{
          this.name  = resp.data.data
          if(this.name!=""){
            this.showReal  =  false;

          }
         
        })
      }
    }
}


</script>