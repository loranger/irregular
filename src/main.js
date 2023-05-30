import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import './style.css'
import App from './App.vue'

const routes = [
    { path: '/:verb?', component: App },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App)

app.use(router)
app.mount('#app')
