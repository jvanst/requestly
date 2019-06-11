import firebase from 'firebase/app'
import 'firebase/auth'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function authGuard (to, from, next) {
  new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      // If user is authenticated
      if (user) {
        if (to.meta && to.meta.noAuthRequired) {
          resolve({ name: 'Dashboard' })
        }
        resolve()
      }
      // No user
      if (to.meta && to.meta.noAuthRequired) {
        resolve()
      }
      resolve({ name: 'Login', query: { redirect: to.path } })
    }, (error) => {
      reject(error)
    })
  })
    .then((path) => next(path))
    .catch(() => next({ name: 'Login' }))
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'home/',
      component: () => import(/* webpackChunkName: "index" */ './layouts/Index.vue'),
      children: [
        {
          path: 'home/',
          name: 'Home',
          component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
        },
        {
          path: 'login/',
          name: 'Login',
          meta: {
            noAuthRequired: true
          },
          beforeEnter: authGuard,
          component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
        },
        {
          path: 'register/',
          name: 'Register',
          meta: {
            noAuthRequired: true
          },
          beforeEnter: authGuard,
          component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
        },
        {
          path: 'recover/',
          name: 'Recover',
          meta: {
            noAuthRequired: true
          },
          beforeEnter: authGuard,
          component: () => import(/* webpackChunkName: "recover" */ './views/Recover.vue')
        }
      ]
    },
    {
      path: '/dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ './layouts/Dashboard.vue'),
      beforeEnter: authGuard,
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: () => import(/* webpackChunkName: "dashboard-index" */ './views/Dashboard/Dashboard.vue')
        }
      ]
    },
    {
      path: '/project/:projectId/',
      component: () => import(/* webpackChunkName: "home" */ './layouts/Project.vue'),
      beforeEnter: authGuard,
      props: true,
      children: [
        {
          path: 'board/',
          name: 'Board',
          component: () => import(/* webpackChunkName: "board" */ './views/Project/Board.vue')
        },
        {
          path: 'requests/',
          name: 'Requests',
          component: () => import(/* webpackChunkName: "requests" */ './views/Project/Requests.vue')
        },
        {
          path: 'request/create/',
          name: 'Create Request',
          component: () => import(/* webpackChunkName: "create-request" */ './views/Project/CreateRequest.vue')
        },
        {
          path: 'request/:id/',
          name: 'Request',
          component: () => import(/* webpackChunkName: "request" */ './views/Project/RequestSingle.vue'),
          props: true
        },
        {
          path: 'forms/',
          name: 'Forms',
          component: () => import(/* webpackChunkName: "forms" */ './views/Project/Forms.vue')
        },
        {
          path: 'labels/',
          name: 'Labels',
          component: () => import(/* webpackChunkName: "labels" */ './views/Project/Labels.vue')
        },
        {
          path: 'users/',
          name: 'Users',
          component: () => import(/* webpackChunkName: "users" */ './views/Project/Users.vue')
        },
        {
          path: 'settings/',
          name: 'Settings',
          component: () => import(/* webpackChunkName: "settings" */ './views/Project/Settings.vue')
        }
      ]
    },
    { path: '*', redirect: '/home' }
  ]
})

export default router
