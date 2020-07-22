import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Submit from '../views/Submit.vue'

Vue.use(VueRouter)

  const routes = [
  { 
    path: '/404', 
    name: '404', 
    component: NotFound, 
  }, 
  { 
    path: '*', 
    redirect: '/404' 
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/submit',
    name: 'Submit',
    component: Submit
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
