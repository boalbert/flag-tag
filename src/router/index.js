import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'HomePage',
		component: HomePage,
	},
	// {
	// 	path: '/about',
	// 	name: 'About',
	// 	// route level code-splitting
	// 	// this generates a separate chunk (about.[hash].js) for this route
	// 	// which is lazy-loaded when the route is visited.
	// 	component: () =>
	// 		import(/* webpackChunkName: "about" */ '../views/About.vue'),
	// },
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
