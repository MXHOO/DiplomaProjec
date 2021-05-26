import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import { getUserInfo } from '@/services/userInfo.js'
let role = []
getUserInfo().then(({ data }) => {
  role = data.role_names || []
  console.log('角色', role)
})
Vue.use(Router)

const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    meta: { title: '登录' },
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/home/index'),
        name: 'Dashboard',
        meta: { title: '主页', icon: 'home', affix: true }
      }
    ]
  },
  {
    path: '/data_total',
    component: Layout,
    hidden: role.includes('student'),
    children: [
      {
        path: 'data_total',
        component: () => import('@/views/dashboard/index'),
        name: 'DataTotal',
        meta: { title: '数据统计', icon: 'home' }
      }
    ]
  },
  {
    path: '/exam',
    component: Layout,
    // hidden: !role.includes('teacher'),
    name: 'ExamPage',
    meta: {
      title: '作业管理',
      icon: 'exam'
    },
    children: [
      {
        path: 'paper/edit',
        component: () => import('@/views/exam/paper/edit'),
        name: 'ExamPaperEdit',
        meta: { title: '试卷编辑', noCache: true, activeMenu: '/exam/paper/list' },
        hidden: true
      },
      {
        path: 'question/list',
        component: () => import('@/views/exam/question/list'),
        name: 'ExamQuestionPageList',
        meta: { title: '题目列表', noCache: true },
        hidden: true
      },
      {
        path: 'homework/list',
        name: 'HomeWrokList',
        component: () => import('@/views/createWork/index.vue'),
        meta: { title: '作业库', noCache: true }
      },
      {
        path: 'homework/publisedList',
        component: () => import('@/views/publishedHomework/index'),
        name: 'publishedHomework',
        meta: { title: '已发布作业', noCache: true }
      },
      {
        path: 'homework/correct',
        name: 'HomeWrokCcorrect',
        component: () => import('@/views/createWork/index.vue'),
        meta: { title: '批改作业', noCache: true }
      },
      {
        path: 'homework/classDetail/:id',
        component: () => import('@/views/classDetail/index.vue'),
        name: 'classDetail',
        hidden: true,
        meta: { title: '作业班级详情', noCache: true }
      }
    ]
  },
  {
    path: '/person',
    component: Layout,
    name: 'Person',
    hidden: role.includes('admin'),
    meta: {
      title: '成员管理',
      icon: 'answer'
    },
    children: [
      {
        path: 'student',
        component: () => import('@/views/personManage/student/index'),
        name: 'studentList',
        meta: { title: '学生管理', noCache: true }
      },
      {
        path: 'teacher',
        component: () => import('@/views/personManage/teacher/index'),
        name: 'teacherList',
        meta: { title: '老师管理', noCache: true }
      },
      {
        path: 'team',
        component: () => import('@/views/personManage/team/index'),
        name: 'teamList',
        meta: { title: '班级管理', noCache: true }
      }
    ]
  },
  {
    path: '/my_work',
    component: Layout,
    hidden: role.includes('student'),
    meta: {
      title: '我的作业管理',
      icon: 'exam'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/myWork/index'),
        name: 'MyWork',
        meta: { title: '我的作业', icon: 'home' }
      },
      {
        path: 'do',
        hidden: true,
        role: ['student'],
        component: () => import('@/views/myWork/do'),
        name: 'DoMyWork',
        meta: { title: '完成作业', icon: 'home' }
      },
      {
        path: 'read',
        hidden: true,
        role: ['student'],
        component: () => import('@/views/myWork/read'),
        name: 'ReadMyWork',
        meta: { title: '查看作业', icon: 'home' }
      },
      {
        path: 'total',
        role: ['student'],
        component: () => import('@/views/myWork/index'),
        name: 'Total',
        meta: { title: '数据统计', icon: 'home' }
      }
      // {
      //   path: 'completedWork',
      //   role: ['student'],
      //   component: () => import('@/views/completedWork/index'),
      //   name: 'completedWork',
      //   meta: { title: '作业详情', icon: 'home' }
      // }
    ]
  },
  {
    path: '/message',
    component: Layout,
    name: 'MessagePage',
    role: ['teacher', 'admin', 'student'],
    meta: {
      title: '消息中心',
      icon: 'message'
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/message/list'),
        name: 'MessageListPage',
        meta: { title: '消息列表', noCache: true }
      },
      {
        path: 'send',
        component: () => import('@/views/message/send'),
        name: 'MessageSendPage',
        meta: { title: '消息发送', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    role: ['teacher', 'admin', 'student'],
    meta: {
      title: '个人信息'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人简介', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/edit/:homework_id',
    role: ['teacher'],
    component: () => import('@/components/createSubject/index.vue'),
    name: 'CreateProject',
    meta: { title: '题目创建' },
    hidden: true
  },
  { path: '*',
    hidden: true,
    role: ['teacher', 'admin', 'student'],
    component: () => import('@/views/error-page/404'),
    meta: { title: '404', noCache: true }
  }
]

const router = new Router({
  routes: constantRoutes
})

export {
  constantRoutes,
  router
}
