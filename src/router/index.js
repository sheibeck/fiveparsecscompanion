import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Crew from '../views/Crew.vue'
import Travel from '../views/Travel.vue'
import World from '../views/World.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { path: '/crew/:id', name: 'Crew', component: Crew },
  { path: '/campaign-turn/travel', name: 'Travel', component: Travel },
  { path: '/campaign-turn/world', name: 'World', component: World }
 // {
 //   path: '/about',
 //   name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
 //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
 // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
