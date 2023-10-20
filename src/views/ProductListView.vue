<template>
 <app-header></app-header>
<div class="content clearfix">
    <!--排行榜-->
    <ul class="rank-list">
      <li v-for="(rank,index) in rankList" :key="index">
        <img src="@/assets/image/list-rank1.png"  v-if="index===0">
        <img src="@/assets/image/list-rank2.png"  v-else-if="index===1">
        <img src="@/assets/image/list-rank3.png"  v-else>
        <p class="rank-list-phone">{{ rank.phone }}</p>
        <span>{{rank.money}}元</span>
      </li>

    </ul>
    <!--产品列表-->
    <ul class="preferred-select clearfix">
      <li v-for="product in productList" :key="product.id">
        <h3 class="preferred-select-title">
          <span>{{ product.name }}</span>
          <img src="@/assets/image/1-bg1.jpg" >
        </h3>
        <div class="preferred-select-number">
          <p><b>{{product.rate}}</b>%</p>
          <span>历史年化收益率</span>
        </div>
        <div class="preferred-select-date">
          <div>
            <span>投资周期</span>
            <p><b>{{ product.cycle }}</b>个月</p>
          </div>
          <div>
            <span>剩余可投资金额</span>
            <p><b>{{ product.leftMoney }}</b>元</p>
          </div>
        </div>
        <p class="preferred-select-txt">
                                              优选计划项目，投资回报周期{{product.cycle}}个月，起点低，适合短期资金周转、对流动性要求高的投资人。
        </p>
        <a href="javascript:;" @click="showDetail('/product/detail',{ pid: product.id})" class="preferred-select-btn">立即投资</a>
      </li>
    </ul>

    <!--分页-->
    <div class="page_box">
      <ul class="pagination">
        <li><a href="javascript:void(0)" @click="firstPage" >首页</a></li>
        <li><a  href="javascript:void(0)" @click="prePage">上一页</a></li>
        <li class="active"><span>{{pageInfo.pageNo}}</span></li>
        <li><a href="javascript:void(0)" @click="nextPage">下一页</a></li>
        <li><a href="javascript:void(0)" @click="lastPage">尾页</a></li>
        <li class="totalPages"><span>共{{pageInfo.totalPage}}页</span></li>
      </ul>
    </div>

  </div>

  <app-footer></app-footer>

</template>
<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue"
import { doGet } from "@/http/httpRequest";
export default {
    name : "ProductListView",
    components : {
        AppFooter,
        AppHeader
    },
    data(){
    return {
      queryType:-1,
      productList: [{
        cycle: 0,
        id: 0,
        leftMoney: 0,
        maxLimit: 0,
        minLimit: 0,
        money: 0,
        name: "",
        productNo: "",
        rate: 0,
        type: 0
      }],
      pageInfo:{
        pageNo:1,
        totalPage:0
      },
      rankList:[ {
        phone: "",
        money: 0
      }]
    }
  },

  mounted(){

    this.loadRankList();
      this.queryType  =  this.$route.query.type;

      if(this.queryType){
        this.getProductByType(1)
      }

  },
  methods:{

  loadRankList(){

    doGet("/loadRankList",{}).then((resp)=>{
      if(resp.data.code===200)
      {
        this.rankList  =  resp.data.data
        
      }
    })


  },


    showDetail(path,paramerters)
        {
            this.$router.push({
                path : path,
                query: paramerters
            })

        },
    getProductByType(pno){
     
      doGet("/product/type",{type:this.queryType,pageNo:pno}).then((resp)=>{
  
        if(resp.data.code  === 200)
        {
          this.productList  =  resp.data.data.t;
          this.pageInfo.totalPage  =  resp.data.data.pages
          this.pageInfo.pageNo  =  resp.data.data.current
          
        }
      })
    },
    firstPage(){
      this.$router.push("/")
    },
    prePage(){
      if(this.pageInfo.pageNo<=1)
      {
        alert("已经是首页数据了")
        return
      }else{
     this.getProductByType(this.pageInfo.pageNo-1)

      }

    },
    nextPage(){
      console.log('========')

            if(this.pageInfo.pageNo>=this.pageInfo.totalPage)
            {
              console.log('====11111111====')
              alert("已经是最后一页了")

              return;
            }
            

            this.getProductByType(this.pageInfo.pageNo+1)
            console.log('=====2222222===')
             
        },
        lastPage(){
          this.getProductByType(this.pageInfo.totalPage)

        },

  }


}

</script>