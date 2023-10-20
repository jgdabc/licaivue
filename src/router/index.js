import { createRouter,createWebHistory } from "vue-router";


//创建一个对象
const router = createRouter({
    //第一个配置项：路由历史   /a 、 /b 、 /c,类似浏览器的返回（记住每一次访问的路由历史）
    history: createWebHistory(),

    //第二个配置项：配置具体的路由路径，是个数组，可以配置很多个路由路径
    routes:[
        {
            //路由路径
            path:'/',
      
            component : () => import('@/views/indexView.vue')
        },
        {
            path: '/product/list',
            name : 'ProductListView',
            component : () => import('@/views/ProductListView.vue')

        },
        {
            path: '/product/detail',
            name : 'ProductDetailView',
            component : () => import('@/views/ProductDetailView.vue')
            

        },
        {
            path : '/user/register',
            name : 'UserRegisterView',
            component : ()=> import('@/views/UserRegisterView.vue')
        },

        {
            path : "/user/login",
            name: "UserLoginView",
            component : ()=>import('@/views/UserLoginView.vue')

        },
        {
            path: '/user/real',
            name : "UserRealNameView",
            component : ()=>import("@/views/UserRealNameView.vue")

        }

    ]
})

//导出router对象
export default router;