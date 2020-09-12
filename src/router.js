import VueRouter from 'vue-router'
import Vue from 'vue';
import Add from './components/Add'
import View from './components/View'
import Main from './components/Main'

Vue.use(VueRouter);

const routes = [
    { path:'/add', name:'add', component:Add },
    { path:'/view/:id', name: 'view', component:View, props:true },
    { path:'/', name: 'main', component:Main },
]


const router = new VueRouter({
    mode:'history',
    base: process.env.BASE_URL,
    routes

})

export default router