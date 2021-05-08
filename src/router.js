import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

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
    path: '/user',
    component: Layout,
    name: 'UserPage',
    meta: {
      title: '用户管理',
      icon: 'users'
    },
    children: [
      {
        path: 'student/list',
        component: () => import('@/views/user/student/list'),
        name: 'UserStudentPageList',
        meta: { title: '学生列表', noCache: true }
      }
    ]
  },
  {
    path: '/exam',
    component: Layout,
    name: 'ExamPage',
    meta: {
      title: '卷题管理',
      icon: 'exam'
    },
    children: [
      {
        path: 'paper/list',
        component: () => import('@/views/exam/paper/list'),
        name: 'ExamPaperPageList',
        meta: { title: '试卷列表', noCache: true }
      },
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
        meta: { title: '作业列表', noCache: true }
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
        path: 'question/edit/singleChoice',
        component: () => import('@/views/exam/question/edit/single-choice'),
        name: 'singleChoicePage',
        meta: { title: '单选题编辑', noCache: true, activeMenu: '/exam/question/list' },
        hidden: true
      },
      {
        path: 'question/edit/multipleChoice',
        component: () => import('@/views/exam/question/edit/multiple-choice'),
        name: 'multipleChoicePage',
        meta: { title: '多选题编辑', noCache: true, activeMenu: '/exam/question/list' },
        hidden: true
      },
      {
        path: 'question/edit/trueFalse',
        component: () => import('@/views/exam/question/edit/true-false'),
        name: 'trueFalsePage',
        meta: { title: '判断题编辑', noCache: true, activeMenu: '/exam/question/list' },
        hidden: true
      },
      {
        path: 'question/edit/gapFilling',
        component: () => import('@/views/exam/question/edit/gap-filling'),
        name: 'gapFillingPage',
        meta: { title: '填空题编辑', noCache: true, activeMenu: '/exam/question/list' },
        hidden: true
      },
      {
        path: 'question/edit/shortAnswer',
        component: () => import('@/views/exam/question/edit/short-answer'),
        name: 'shortAnswerPage',
        meta: { title: '简答题编辑', noCache: true, activeMenu: '/exam/question/list' },
        hidden: true
      }
    ]
  },
  // {
  //   path: '/task',
  //   component: Layout,
  //   name: 'TaskPage',
  //   meta: {
  //     title: '任务管理',
  //     icon: 'task'
  //   },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'list',
  //       component: () => import('@/views/task/list'),
  //       name: 'TaskListPage',
  //       meta: { title: '任务列表', noCache: true }
  //     },
  //     {
  //       path: 'edit',
  //       component: () => import('@/views/task/edit'),
  //       name: 'TaskEditPage',
  //       meta: { title: '任务创建', noCache: true }
  //     },
  //     {
  //       path: 'student',
  //       component: () => import('@/views/studentList/index.vue'),
  //       name: 'stndentList',
  //       meta: { title: '学生列表' }
  //     }
  //   ]
  // },
  // {
  //   path: '/answer',
  //   component: Layout,
  //   name: 'AnswerPage',
  //   meta: {
  //     title: '成绩管理',
  //     icon: 'answer'
  //   },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'list',
  //       component: () => import('@/views/answer/list'),
  //       name: 'AnswerPageList',
  //       meta: { title: '答卷列表', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/person',
    component: Layout,
    name: 'Person',
    meta: {
      title: '成员管理',
      icon: 'answer'
    },
    alwaysShow: true,
    children: [
      {
        path: 'student',
        component: () => import('@/views/personManage/student/index'),
        name: 'AnswerPageList',
        meta: { title: '学生管理', noCache: true }
      },
      {
        path: 'teacher',
        component: () => import('@/views/personManage/teacher/index'),
        name: 'AnswerPageList',
        meta: { title: '老师管理', noCache: true }
      }
    ]
  },
  {
    path: '/my_work',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/myWork/index'),
        name: 'MyWork',
        meta: { title: '我的作业', icon: 'home' }
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    name: 'MessagePage',
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
    component: () => import('@/components/createSubject/index.vue'),
    name: 'CreateProject',
    meta: { title: '题目创建' },
    hidden: true
  },
  { path: '*',
    hidden: true,
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
