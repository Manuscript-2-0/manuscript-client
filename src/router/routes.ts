import { auth } from './middlware'

export default [
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/Home.vue')
	},
	{
		path: '/events',
		name: 'Events',
		component: () => import('../views/Events.vue')
	},
	{
		path: '/events/:id',
		name: 'EventDetails',
		component: () => import('../views/EventDetails.vue')
	},
	{
		path: '/events/create',
		name: 'EventCreate',
		meta: { middleware: auth },
		component: () => import('../views/EventCreate.vue')
	},
	{
		path: '/events/edit/:id',
		name: 'EventEdit',
		meta: { middleware: auth },
		component: () => import('../views/EventCreate.vue')
	},
	{
		path: '/teams',
		name: 'Teams',
		component: () => import('../views/Teams.vue')
	},
	{
		path: '/teams/:id',
		name: 'TeamDetails',
		component: () => import('../views/TeamDetails.vue')
	},
	{
		path: '/teams/create/:eventId',
		name: 'TeamCreate',
		meta: { middleware: auth },
		component: () => import('../views/TeamCreate.vue')
	},
	{
		path: '/teams/edit/:id',
		name: 'TeamEdit',
		meta: { middleware: auth },
		component: () => import('../views/TeamCreate.vue')
	},
	// {
	// 	path: '/teams/:id/edit',
	// 	name: 'TeamEdit',
	// 	meta: { middleware: auth },
	// 	component: () => import('../views/TeamEdit.vue')
	// },
	{
		path: '/notifications',
		name: 'Notifications',
		meta: { middleware: auth },
		component: () => import('../views/Notifications.vue')
	},
	{
		path: '/faq',
		name: 'FAQ',
		component: () => import('../views/FAQ.vue')
	},
	{
		path: '/profile',
		name: 'Profile',
		meta: { middleware: auth },
		component: () => import('../views/Profile.vue')
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue')
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('../views/Register.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import('../views/NotFound.vue')
	}
]
