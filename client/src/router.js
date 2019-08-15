import Vue from 'vue';
import Router from 'vue-router';
import MainPage from './components/MainPage.vue';
import QuestPage from './components/QuestPage.vue';
import ErrorPage from './components/ErrorPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { 
      path: '/', 
      redirect: '/quests' 
    },
    {
      path: '/quests',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/quests/:alias/:globalId',
      name: 'QuestPage',
      component: QuestPage
    },
    {
      path: '/quests/not-found',
      name: 'QuestInfoErrorPage',
      component: ErrorPage,
      props: true
    },
    {
      path: '/quests/connection-error',
      name: 'ServerConnectionErrorPage',
      component: ErrorPage,
      props: true,
    },
    { 
      path: '*', 
      name: 'NotFoundErrorPage', 
      component: ErrorPage  
    }
  ]
})
