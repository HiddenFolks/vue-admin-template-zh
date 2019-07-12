import Vue from 'vue'
import Router from 'vue-router'
import Home from './../views/Home'
import Login from './../views/Login'
import Table from '@/components/Table'
import Echart from '@/components/Echart'
import Transition from '@/components/Transition'
import Message from '@/components/Message'
import Slider from '@/components/Slider'
import Upload from '@/components/Upload'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [    
    {
      path:'/',   
      name:'导航一',
      iconCls:'el-icon-message',
      component:Home,
      children:[
        { path:'Table',name:'Table+轮播', component: Table},
        { path: 'Eachrt',name:'Echart图表',component:Echart},
        { path: 'Transiton' ,name:'Transition',component:Transition }
      ]
    },
    {
      path:'/',   
      name:'导航二',
      iconCls:'fa fa-id-card-o',
      component:Home,
      children:[
        { path:'Message',name:'Message消息提醒', component: Message},
        { path:'Slider',name:'Slider组件',component:Slider}

      ]
    },
    {
      path:'/',    
      name:'导航三',
      iconCls:'fa fa-address-card',
      component:Home,
      children:[
        { path:'Upload',name:'Upload文件上传', component: Upload},
    
      ]
    },
    {
      path:'/',    
      name:'导航四',
      iconCls:'fa fa-bar-chart',
      component:Home,
   
    },
    {
      path: '/Login',
      component: Login,
      hidden:true
    },
  
    

  ]
})
