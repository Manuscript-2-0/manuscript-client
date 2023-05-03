import { AuthService } from '@/services/auth'
import { RouteLocationNormalizedLoaded, RouteLocationRaw } from 'vue-router'

interface IMiddlewareContext {
	from: RouteLocationNormalizedLoaded
	next: (to?: RouteLocationRaw) => void
}

export default function ({ next }: IMiddlewareContext) {
	if (AuthService.isAuthorized()) {
		next()
		return
	}

	next({ name: 'Login' })
}
