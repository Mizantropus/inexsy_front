import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Submit from '../views/Submit.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

  const routes = [
  { 
    path: '*', 
    component: NotFound,  
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
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registration',
    name: 'Signup',
    component: Signup
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
