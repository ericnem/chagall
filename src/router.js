import { createRouter, createWebHistory } from 'vue-router'
import CoverPage from './components/CoverPage.vue'
import GameScreen from './components/GameScreen.vue'

const routes = [
  { path: '/', component: CoverPage },
  { path: '/game', component: GameScreen }
   
]

const router = createRouter({
  history: createWebHistory(),
  routes, 
})

export default router

