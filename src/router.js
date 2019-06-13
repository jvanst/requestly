import firebase from 'firebase/app'
import 'firebase/auth'

import Vue from 'vue'
import Router from 'vue-router'
import VueHead from 'vue-head'

import Index from '@/layouts/Index'
import Home from '@/views/Home'

Vue.use(Router)

Vue.use(VueHead, {
  complement: 'Requestly'
})

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
      redirect: '/home',
      component: Index,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: 'login/',
          name: 'Login',
          meta: {
            noAuthRequired: true
          },
          beforeEnter: authGuard,
          component: () => import(/* webpackChunkName: "client-chunk-login" */ './views/Login.vue')
        },
        {
          path: 'register/',
          name: 'Register',
          meta: {
            noAuthRequired: true
          },
          beforeEnter: authGuard,
          component: () => import(/* webpackChunkName: "client-chunk-register" */ './views/Register.vue')
        },
        {
          path: 'recover/',
          name: 'Recover',
          meta: {
            noAuthRequired: true
          },
          beforeEnter: authGuard,
          component: () => import(/* webpackChunkName: "client-chunk-recover" */ './views/Recover.vue')
        }
      ]
    },
    {
      path: '/dashboard',
      component: () => import(/* webpackChunkName: "client-chunk-dashboard" */ './layouts/Dashboard.vue'),
      beforeEnter: authGuard,
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: () => import(/* webpackChunkName: "client-chunk-dashboard-index" */ './views/Dashboard/Dashboard.vue')
        }
      ]
    },
    {
      path: '/project/:projectId/',
      component: () => import(/* webpackChunkName: "client-chunk-home" */ './layouts/Project.vue'),
      beforeEnter: authGuard,
      props: true,
      children: [
        {
          path: 'board/',
          name: 'Board',
          component: () => import(/* webpackChunkName: "client-chunk-board" */ './views/Project/Board.vue')
        },
        {
          path: 'requests/',
          name: 'Requests',
          component: () => import(/* webpackChunkName: "client-chunk-requests" */ './views/Project/Requests.vue')
        },
        {
          path: 'request/create/',
          name: 'Create Request',
          component: () => import(/* webpackChunkName: "client-chunk-create-request" */ './views/Project/CreateRequest.vue')
        },
        {
          path: 'request/:id/',
          name: 'Request',
          component: () => import(/* webpackChunkName: "client-chunk-request" */ './views/Project/RequestSingle.vue'),
          props: true
        },
        {
          path: 'forms/',
          name: 'Forms',
          component: () => import(/* webpackChunkName: "client-chunk-forms" */ './views/Project/Forms.vue')
        },
        {
          path: 'labels/',
          name: 'Labels',
          component: () => import(/* webpackChunkName: "client-chunk-labels" */ './views/Project/Labels.vue')
        },
        {
          path: 'users/',
          name: 'Users',
          component: () => import(/* webpackChunkName: "client-chunk-users" */ './views/Project/Users.vue')
        },
        {
          path: 'settings/',
          name: 'Settings',
          component: () => import(/* webpackChunkName: "client-chunk-settings" */ './views/Project/Settings.vue')
        }
      ]
    }
  ]
})

export default router
