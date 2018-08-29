import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/discuss',
      name: 'discuss',
      component: () => import('./views/Discuss.vue'),
      children: [
          {
            path: '/discuss',
            name: 'allQ',
            component: () => import('./components/Qcards.vue')
          },
          {
            path: '/discuss/ask',
            name: 'ask',
            component: () => import('./components/Ask.vue')
          },
          {
            path: '/discuss/:id/explore',
            name: 'info',
            component: () => import('./components/Explore.vue')
          }
      ]
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('./views/Profil.vue'),
      children: [
        {
          path: '/profil',
          name: 'user question',
          component:() => import ('./components/QUser.vue')
        },
        {
          path: '/profil/:id/exploreUser',
          name: 'explore User',
          component: () => import('./components/ExploreUser.vue')
        },
        {
          path: '/profil/:id/update',
          name: 'Update Q',
          component: () => import('./components/UpdateQ.vue')
        },

      ]
    }, 
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    }
  ]
})
