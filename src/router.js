import { createRouter, createWebHistory } from 'vue-router'
import CoverPage from './components/CoverPage.vue'
import GameScreen from './components/GameScreen.vue'

const routes = [
  { path: '/', component: CoverPage },
  { path: '/game',
    name: 'game', 
    component: GameScreen,
    props : { startEra: 0, endEra: 0},
    meta: {
      auth: true
    } 
  }
   
]

const router = createRouter({
  history: createWebHistory(),
  routes, 
})

export default router

