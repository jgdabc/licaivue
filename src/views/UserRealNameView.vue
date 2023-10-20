<template>
<AppHeader></AppHeader>
<div class="login-content">
    <div class="login-flex">
        <div class="login-left"></div>
        <!---->
        <div class="login-box">
            <h3 class="login-title">实名认证</h3>
            <form action="" id="renZ_Submit">
                <div class="alert-input">
                    <input type="text" class="form-border user-name" name="username" v-model="RealName.name" @blur="checkName" placeholder="请输入您的真实姓名">
                    <div class="input-err">{{nameErr}}</div>

                    <p class="prompt_name"></p>
                    <input type="text" class="form-border user-sfz" name="sfz" v-model="RealName.idCard" @blur="checkIdCard" placeholder="请输入15位或18位身份证号">
                    <div class="input-err">{{idCardErr}}</div>
                    <p class="prompt_sfz"></p>
                    <input type="text" class="form-border user-num" name="mobile" v-model="RealName.phone" @blur="checkPhone" placeholder="请输入11位手机号">
                    <div class="input-err">{{phoneErr}}</div>
     
                </div>
				<br/>
                <div class="alert-input-agree">
                    <input type="checkbox" v-model="agree">我已阅读并同意<a href="javascript:;" target="_blank">《动力金融网注册服务协议》</a>
                </div>
                <div class="alert-input-btn">
                    <input type="button" class="login-submit" @click="realNameLogin" value="认证">
                </div>
            </form>
            <div class="login-skip">
                暂不认证？ <a href="javascript:;">跳过</a>
            </div>
        </div>

    </div>
</div>

<AppFooter></AppFooter>
</template>

<script>
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';
import { doPost } from '@/http/httpRequest';
export default{
name : "UserRealNameView",
components:{
    AppHeader,
    AppFooter
    

},
data(){
   return{
    RealName:{
        name : '',
        idCard: '',
        phone: ''
    },

    agree : false,
    idCardErr : "",
    phoneErr : "",
    nameErr : "",
  
   
   }
   

},

methods:{


    realNameLogin(){


        if(!this.agree){

            alert("请同意协议")
            return false;
        }

        if(this.phoneErr == "" && this.nameErr ==""&& this.idCardErr==""){
     

            doPost("/user/realname",this.RealName).then((resp)=>{
                     if(resp.data.code===200){
                        alert("实名认证成功")
                     }else{
                        alert(resp.data.msg)
                     }
                // 
            })
// 

        }




    },


    
    checkPhone(){
       if( !this.RealName.phone){
         this.phoneErr='请输入手机号'
       } else if ( this.RealName.phone.length != 11){
         this.phoneErr='手机号是11位长度'
       } else if( !/^1[3-9]\d{9}$/.test(this.RealName.phone)){
         this.phoneErr='手机号格式错误'
       } else {
         this.phoneErr='';
       }
    },


    checkName(){
        if(!this.RealName.name){
            this.nameErr = '请输入姓名'
        }else{
            this.nameErr = ""
        }

    },
    checkIdCard(){
        var idCardReg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
        if(!this.RealName.idCard){
            this.idCardErr =  "请输入身份证号码"
        }else if(!idCardReg.test(this.RealName.idCard)){
            this.idCardErr  =  "请输入正确的身份证号码"
        }else{
            this.idCardErr = ""
        }


    }


}

}


</script>