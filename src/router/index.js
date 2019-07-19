import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [

    {
      path: '/',
      name: '导航一',
      iconCls: 'el-icon-message',
      component: resolve => require(['@/views/Home'], resolve),
      children: [{
          path: 'index',
          name: 'index',
          component: resolve => require(['@/components/index'], resolve)
        },
        {
          path: 'Table',
          name: 'Table+轮播',
          component: resolve => require(['@/components/Table'], resolve)
        },
        {
          path: 'Echart',
          name: 'Echar图表',
          component: resolve => require(['@/components/Echart'], resolve)
        }
      ]
    },
    {
      path: '/',
      name: '导航二',
      iconCls: 'fa fa-id-card-o',
      component: resolve => require(['@/views/Home'], resolve),
      children: [{
          path: 'Message',
          name: 'Message消息提醒',
          component: resolve => require(['@/components/Message'], resolve)
        },
        {
          path: 'Slider',
          name: 'Slider组件',
          component: resolve => require(['@/components/Slider'], resolve)
        },
        {
          path: 'Transition',
          name: 'Transition',
          component: resolve => require(['@/components/Transition'], resolve)
        }

      ]
    },
    {
      path: '/',
      name: '导航三',
      iconCls: 'fa fa-address-card',
      component: resolve => require(['@/views/Home'], resolve),
      children: [{
          path: 'Upload',
          name: 'Upload文件上传',
          component: resolve => require(['@/components/Upload'], resolve)
        },
        {
          path: 'VueEditor',
          name: '富文本编辑器',
          component: resolve => require(['@/components/VueEditor'], resolve)
        },
        {
          path: 'Markdown',
          name: 'Markdown编辑器',
          component: resolve => require(['@/components/Markdown'], resolve)
        }
      ]
    },
    {
      path: '/',
      name: '导航四',
      iconCls: 'fa fa-bar-chart',
      component: resolve => require(['@/views/Home'], resolve),
      children: [{
          path: 'Permission',
          name: '权限测试',
          component: resolve => require(['@/components/Permission'], resolve)
        },
        {
          path: '403',
          component: resolve => require(['@/components/403'], resolve),
          hidden: true
        },
        {
          path:'404',
          name:'404页面',
          component:resolve =>require(['@/components/404'],resolve)
        }
      ]

    },
    {
      path: '/Login',
      component: resolve => require(['@/views/Login'], resolve),
      hidden: true
    },




  ]
})
