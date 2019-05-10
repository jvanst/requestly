import Vue from 'vue'
import Router from 'vue-router'
// import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Board',
      component: () => import(/* webpackChunkName: "board" */ './views/Board.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/recover',
      name: 'Recover',
      component: () => import(/* webpackChunkName: "recover" */ './views/Recover.vue')
    },
    {
      path: '/request/create',
      name: 'Create Request',
      component: () => import(/* webpackChunkName: "create-request" */ './views/CreateRequest.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/request/:id',
      name: 'Request',
      component: () => import(/* webpackChunkName: "request" */ './views/Request.vue'),
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/forms/',
      name: 'Forms',
      component: () => import(/* webpackChunkName: "forms" */ './views/Forms.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/forms/create',
      name: 'Create Form',
      component: () => import(/* webpackChunkName: "create-form" */ './views/FormBuilder.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/forms/edit/:id',
      name: 'Edit Form',
      props: true,
      component: () => import(/* webpackChunkName: "create-edit" */ './views/FormBuilder.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/labels/',
      name: 'Labels',
      component: () => import(/* webpackChunkName: "labels" */ './views/Labels.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!store.state.user.isLoggedIn) {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router
