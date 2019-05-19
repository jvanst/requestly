import firebase from 'firebase/app'
import 'firebase/auth'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function authGuard (to, from, next) {
  new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(() => {
      resolve()
    }, (error) => {
      reject(error)
    })
  })
    .then(() => next())
    .catch(() => next({ name: 'Login' }))
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "index" */ './layouts/Index.vue'),
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
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
      path: '/project/:projectId',
      component: () => import(/* webpackChunkName: "home" */ './layouts/Project.vue'),
      beforeEnter: authGuard,
      props: true,
      children: [
        {
          path: '',
          name: 'Board',
          component: () => import(/* webpackChunkName: "board" */ './views/Project/Board.vue')
        },
        {
          path: 'request/create/',
          name: 'Create Request',
          component: () => import(/* webpackChunkName: "create-request" */ './views/Project/CreateRequest.vue')
        },
        {
          path: 'request/:id/',
          name: 'Request',
          component: () => import(/* webpackChunkName: "request" */ './views/Project/Request.vue'),
          props: true
        },
        {
          path: 'forms/',
          name: 'Forms',
          component: () => import(/* webpackChunkName: "forms" */ './views/Project/Forms.vue')
        },
        {
          path: 'forms/create/',
          name: 'Create Form',
          component: () => import(/* webpackChunkName: "create-form" */ './views/Project/FormBuilder.vue')
        },
        {
          path: 'forms/edit/:id/',
          name: 'Edit Form',
          props: true,
          component: () => import(/* webpackChunkName: "create-edit" */ './views/Project/FormBuilder.vue')
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
        }
      ]
    }
  ]
})

export default router
