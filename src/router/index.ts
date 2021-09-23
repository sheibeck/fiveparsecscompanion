import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  { path: '/crew/:id', name: 'Crew', component: () => import(/* webpackChunkName: "crew" */ '../views/Crew.vue') },
  { path: '/campaign-turn/travel', name: 'Travel', component:  () => import(/* webpackChunkName: "travel" */ '../views/Travel.vue') },
  { path: '/campaign-turn/world', name: 'World', component:  () => import(/* webpackChunkName: "world" */ '../views/World.vue') },
  { path: '/campaign-turn/battle', name: 'Battle', component: () => import(/* webpackChunkName: "battle" */ '../views/Battle.vue') },
  { path: '/campaign-turn/post-battle', name: 'Post-Battle', component: () => import(/* webpackChunkName: "postbattle" */ '../views/Post-Battle.vue') }

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
