/*import{createMemoryHistory, createRouter} from 'vue-router'
import MainContent from "./components/MainContent.vue";
import HowToUse from "./components/HowToUse.vue";
import Settings from "./components/Settings.vue";
import Tasks from "./components/Tasks.vue";
import Notes from "./components/Notes.vue";
import Premium from "./components/Premium.vue";
import Notifications from "./components/Notifications.vue"

const routes = [
    {path: '/', component: MainContent},
    {path: '/how-to-use', component: HowToUse},
    {path: '/settings', component: Settings},
    {path: '/tasks', component: Tasks},
    {path: '/notes', component: Notes},
    {path: '/premium', component: Premium},
    {path: '/notifications', component: Notifications}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router*/
import { createWebHistory, createRouter } from 'vue-router'
import MainContent from "./components/MainContent.vue";
import HowToUse from "./components/HowToUse.vue";
import Settings from "./components/Settings.vue";
import Tasks from "./components/Tasks.vue";
import Notes from "./components/Notes.vue";
import Premium from "./components/Premium.vue";
import Notifications from "./components/Notifications.vue";

const routes = [
  { path: '/', component: MainContent },
  { path: '/how-to-use', component: HowToUse },
  { path: '/settings', component: Settings },
  { path: '/tasks', component: Tasks },
  { path: '/notes', component: Notes },
  { path: '/premium', component: Premium },
  { path: '/notifications', component: Notifications }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;


