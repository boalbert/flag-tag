import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'HomePage',
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/HomePage.vue'),
	},
	{
		path: '/register',
		name: 'LoginRegisterPage',
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/LoginRegisterPage.vue'),
	},
	{
		path: '/profile',
		name: 'ProfilePage',
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/ProfilePage.vue'),
	},
]

const router = new VueRouter({
	routes,
})

export default router
