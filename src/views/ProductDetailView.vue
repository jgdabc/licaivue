<template>
<AppHeader></AppHeader>

<div class="content clearfix">
    <div class="detail-left">
        <div class="detail-left-title">{{investRecord[0]. productName}}（{{investRecord[0].releaseTime}}期）</div>
        <ul class="detail-left-number">
            <li>
                <span>历史年化收益率</span>
                <p><b>{{investRecord[0].rate}}</b>%</p>
                <span>历史年化收益率</span>
            </li>
            <li>
                <span>募集金额（元）</span>
                <p><b>{{investRecord[0].productMoney}}</b>元</p>
                <span>募集中&nbsp;&nbsp;剩余募集金额{{investRecord[0].leftProductMoney}}元</span>
            </li>
            <li>
                <span>投资周期</span>
                <p><b>{{investRecord[0].cycle}}</b>个月</p>
            </li>

        </ul>
        <div class="detail-left-way">
            <span>收益获取方式</span>
            <span>收益返还：<i>到期还本付息</i></span>
        </div>
        <!--投资记录-->
        <div class="datail-record">
            <h2 class="datail-record-title">投资记录</h2>
            <div class="datail-record-list">
                <table align="center" width="880" border="0" cellspacing="0" cellpadding="0">
                    <colgroup>
                        <col style="width: 72px" />
                        <col style="width: 203px" />
                        <col style="width: 251px" />
                        <col style="width: 354px" />
                    </colgroup>
                    <thead class="datail_thead">
                        <tr>
                            <th>序号</th>
                            <th>投资人</th>
                            <th>投资金额（元）</th>
                            <th>投资时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="userInvest,index in investRecord" :key="userInvest.id">
                            <td>{{index+1}}</td>
                            <td class="datail-record-phone">{{userInvest.phone}}</td>
                            <td>{{userInvest.bidMoney}}</td>
                            <td>{{userInvest.bidTime}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
    <!--右侧-->
    <div class="detail-right">
        <div class="detail-right-title">立即投资</div>
        <div class="detail-right-mode">
            <h3 class="detail-right-mode-title">收益方式</h3>
            <p class="detail-right-mode-p"><span>到期还本付息</span></p>
            <h3 class="detail-right-mode-title">我的账户可用</h3>
            <div class="detail-right-mode-rmb">
                <p>资金（元）：{{avaliableMoney}}</p>
                <a v-if="valiableMoney=null" href="/user/login" target="_blank">请登录</a>
            </div>
            <h3 class="detail-right-mode-title">预计本息收入{{this.inComeMoney}}（元）</h3>
            <form action="" id="number_submit">
                <p>{{textSay}}</p>
                <input type="text" v-model="investMoney" @blur="checkInvestMoney" placeholder="请输入日投资金额，应为100元整倍数" name="" class="number-money" >
                <input type="submit" value="立即投资" class="submit-btn">
            </form>

        </div>

    </div>




</div>

<AppFooter></AppFooter>
</template>

<script>
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';
import { doGet } from '@/http/httpRequest';


export default{
    name : "ProductDetaiView",
    components : {
        AppHeader,
        AppFooter



    },
    data(){
        return{
            textSay : "请在下方输入投资金额",
            investMoney : 0,
            inComeMoney : 0,
            
            investRecord : [

            { //投资记录
            phone:0,
            bidMoney :0,
            bidTime : "",

            productName: "",
            releaseTime : "",
            rate : 0,
            productMoney : 0,
            cycle :0,
            leftProductMoney : 0,
            avaliableMoney :0

             // cycle,

            }
            ]
        }

        },

    mounted(){
        this.loadInvestRecord();
        this.loadUserFinance();

    },
    methods:{
       
        checkInvestMoney(){ 
        var r = /^[1-9]\d*00$/;
        if(!r.test(this.investMoney)){
            this.textSay  =  "请输入100的整数倍金额"
        }else{
            if(this.investRecord[0].cycle===1)
            alert(this.investRecord[0].rate)
            if(this.investMoney>this.avaliableMoney){
                this.textSay =  "资金不足"
                return
            }
            if(this.investRecord[0].leftProductMoney===0){
                this.textSay =  "投标已满"
                return
            }
        
            this.inComeMoney  = (this.investRecord[0].rate/100/365)*(this.investMoney*this.investRecord[0].cycle)*360 - (-this.investMoney);//这样用来保证绝对数字
            
         
            
        }

       },
      loadInvestRecord()
      {
        let pid  =  this.$route.query.pid
        //  alert(pid)
        doGet("/getInvestRecord/",{pid}).then((resp)=>{
            if(resp.data.code===200)
            {
                // alert("aaaaa")
                this.investRecord  =  resp.data.data;
               

            }
        })

      },
      loadUserFinance(){

        let token =  window.localStorage.getItem("loginToken");
        if(token){
             
        doGet("/finance/user").then((resp)=>{
            if(resp.data.code===200)
            {
                if(resp.data.data)
                {
                    this.avaliableMoney =  resp.data.data;
                }
                
            }

        })


        }
      },

    }
}






</script>
<style scoped>
</style>