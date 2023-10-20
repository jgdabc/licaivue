<template>
    <AppHeader></AppHeader>
<!--end-->

<div class="login-content">
    <div class="login-flex">
        <div class="login-left">
            <h3>加入动力金融网</h3>
            <p>坐享<span>{{baseInfo.prodctAvgRate}}%</span>历史年化收益</p>
            <p>平台用户<span>{{baseInfo.userCount}}</span>位  </p>
            <p>累计成交金额<span>{{baseInfo.sumBidMoney}}</span>元</p>
        </div>
        <!---->
        <div class="login-box">
            <h3 class="login-title">欢迎登录</h3>
            <form action="" id="login_Submit">
                <div class="alert-input">
                    <!--<input class="form-border user-name" name="username" type="text" placeholder="您的姓名">
                    <p class="prompt_name"></p>-->
                    <input type="text" class="form-border user-num" v-model="phone" @blur="checkPhone" name="mobile" placeholder="请输入11位手机号">
                     <div class="input-err">{{phoneErr}}</div>
                     <p class="prompt_num"></p>
                      <input type="password" placeholder="请输入6-20位英文和数字混合密码" v-model="secret" @blur="checkSecret" class="form-border user-pass" autocomplete name="password">
                     <div class="input-err">{{secretErr}}</div>
                      <p class="prompt_pass"></p>
                       <div class="form-yzm form-border">
              <input class="yzm-write" type="text" v-model="code" @blur="checkCode" placeholder="输入短信验证码">
              <input class="yzm-send" type="button" v-model="yzmText" @click="sendRegisterSms">
            </div>
            <div class="input-err">{{codeErr}}</div>
            <p class="prompt_yan"></p>
                </div>
                <div class="alert-input-agree">
             <input type="checkbox" v-model="agree">我已阅读并同意<a href="javascript:;" target="_blank">《动力金融网注册服务协议》</a>
              </div>
                <div class="alert-input-btn">
                    <input type="button" @click="loginUser" class="login-submit" value="登录">
                </div>
            </form>
            <div class="login-skip">
                没有账号？ <a href="/user/register" target="_blank">注册</a> 
            </div>
          

        </div>

    </div>
</div>


    <AppFooter></AppFooter>

</template>
<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import { doGet, doPost } from '@/http/httpRequest';
import {clearToken} from '@/util/token';
export default{

    name : "UserLoginView",
    components:{
        AppHeader,
        AppFooter
        

    },
    data(){
        return {
            baseInfo:{
                prodctAvgRate : 0,
                userCount : 0,
                sumBidMoney : 0
            },
          phone:'',
          phoneErr:'',
          secret:'',
          secretErr:'',
          code:'',
          codeErr:'',
          agree:false,
          leftTiming:false,
          yzmText:'获取验证码',
          registerClickCount  :0
        }
    },
    mounted(){
        this.getBaseInfo();


    },

    methods:{

        loginUser(){

      
            if(!this.agree)
            {
                alert("请阅读注册协议")
                return;
            }
            if(this.registerClickCount<=0){
               alert("请先获取验证码")
            }

            if(this.phoneErr == "" && this.secretErr == "" && this.codeErr == ""){
           
            let userLoginQuery  ={
            phone: this.phone,
            secret : this.secret,
            code: this.code
            }
            doPost("/user/login/",userLoginQuery).then((resp=>{
  
    
                if(resp.data.code ===200){

          
                    clearToken();
                    window.localStorage.setItem("loginToken",resp.data.data)
                    alert("登录成功")
                }



            }))

          
    }

            



        },

        getBaseInfo(){
         
            
            doGet("/app/baseinfo",{}).then((resp)=>{
            
            if(resp.data.code===200)
            {


                
                this.baseInfo  =  resp.data.data

            }
        })
        },


        sendRegisterSms(){
        if(this.leftTiming)
        {
          return;
        }
        this.checkCode();
        if(this.phoneErr!= ''){
          return;
        }
        this.leftTiming  =  true;
        let second  = 10;
        this.yzmText  =  second + "秒后获取";
        let handle  =  setInterval(()=>{
          if(second<=1)
          {
            this.leftTiming  =  false;
            this.yzmText  =  "获取验证码";
            window.clearInterval(handle)

          }else {
            second =  second  -1;
            this.registerClickCount =  this.registerClickCount+1
            this.yzmText =  second  + "秒后获取";

          }
        },1000)


        let type = 2;

        
        doGet("/sms/"+type,{phone:this.phone}).then((resp)=>{
                if(resp.data.code===200){
                  alert("验证码已经发送，请注意查收")
                }
        })

        

        
        },

        checkPhone(){
       if( !this.phone){
         this.phoneErr='请输入手机号'
       } else if ( this.phone.length != 11){
         this.phoneErr='手机号是11位长度'
       } else if( !/^1[3-9]\d{9}$/.test(this.phone)){
         this.phoneErr='手机号格式错误'
       } else {
         this.phoneErr='';
       }
    },
    checkSecret(){
      if( !this.secret){
        this.secretErr='请输入密码'
      } else if( this.secret.length < 6 || this.secret.length > 20 ){
        this.secretErr='密码是6-20位的'
      } else if( !/^(([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+))[a-zA-Z0-9]*/.test(this.secret)){
        this.secretErr='密码必须包含字母和数字'
      } else {
        this.secretErr=''
      }
    },
    checkCode(){
      if( !this.code){
        this.codeErr='请输入验证码'
      }else if( this.code.length != 4){
        this.codeErr='验证码是4位的'
      } else{
        this.codeErr=''
      }
    },

        





    },


}

</script>