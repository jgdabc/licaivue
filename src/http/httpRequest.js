// import { messageConfirm, messageTip } from "@/util/message";
import { clearToken } from "@/util/token";
import axios from "axios";
axios.defaults.baseURL =  "http://localhost:8080/api"
// axios.defaults.timeout  =  50000

export function  doGet(url,params)
{
    return axios.get(url,{
        params: params
    })

}
export function doGet2(url,params)
{
    return axios({
        method: 'get',
        url: url,
        params: params
    })

}


export function doDelete(url,params){
    return  axios.delete(url,{
        params: params
    })
}

export function doDelete2(url,params){
    return axios({
        method: 'delete',
        url: 'url',
        params: params
    })
}

export function doPost(url,data){
    return axios.post(url,data)
}
export function doPost2(url,data){
    return axios({
        method: 'post',
        url: url,
        data: data
    })

}

export function doPut(url,data)
{
    return axios.put(url,data);
}

export function doPut2(url,data){
    return axios({
        method: 'put',
        url: 'url',
        data: 'data'
    })
} 


// // 封装axios 拦截器


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
 //token 不存在token没有值
    let token =  window.localStorage.getItem("loginToken");
  
if(token){
    config.headers["jwtAuth"]  =  token;
   }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么,判断返回的code值如果是大于900,那么是token的问题
    if(response.data.code===1009)
    {
        // 因为后端的token验证已经不合法了,那么前端存储的token也要清除掉
        clearToken();
            // this.$router.push("/");
            window.location.href =  "/";
      
    }
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

// 封装应答拦截器

axios.interceptors.response.use( resp=>{
    if( resp ){
        if( resp.data.code > 1000 ){
            alert( resp.data.msg)
        }
    }
    return resp;
 }, err =>{
     return Promise.reject(err);
 })


