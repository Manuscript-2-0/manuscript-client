import { createWebHashHistory, createRouter } from 'vue-router'
import routes from './routes'

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	scrollBehavior(_to, _from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { top: 0 }
		}
	}
})

interface IMiddlewareContext {
	from: any
	next: any
	router: any
	to: any
}

const nextFactory = (
	context: IMiddlewareContext,
	middleware: any[],
	index: number
) => {
	const subsequentMiddleware = middleware[index]
	if (!subsequentMiddleware) {
		return context.next
	}

	return () => {
		const nextMiddleware = nextFactory(context, middleware, index + 1)
		subsequentMiddleware({ ...context, next: nextMiddleware })
	}
}

router.beforeEach((to, from, next) => {
	if (to.meta.middleware) {
		const middleware = Array.isArray(to.meta.middleware)
			? to.meta.middleware
			: [to.meta.middleware]

		const context = {
			from,
			next,
			router,
			to
		}

		const nextMiddleware = nextFactory(context, middleware, 1)
		return middleware[0]({ ...context, next: nextMiddleware })
	}

	return next()
})

export default router
