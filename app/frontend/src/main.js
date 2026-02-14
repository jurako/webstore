import './assets/main.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import {
  faCartShopping,
  faBars,
  faXmark,
  faPlus,
  faMinus,
  faArrowLeft,
  faUser,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* add icons to the library */
library.add(
  faCartShopping,
  faBars,
  faXmark,
  faPlus,
  faMinus,
  faArrowLeft,
  faUser,
  faRightFromBracket
)
import BaseIcon from '@/components/BaseIcon.vue'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(pinia)
app.use(router)

app.component('FontAwesomeIcon', FontAwesomeIcon).component('BaseIcon', BaseIcon)

app.mount('#app')
