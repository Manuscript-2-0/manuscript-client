<template>
	<div class="pt-20">
		<nav
			class="navigation fixed left-10 right-10 top-4 px-4 py-2 rounded-lg z-40"
			:class="{}"
		>
			<ul class="flex justify-between items-center h-12.5">
				<button class="flex items-center" @click="$router.push('/')">
					<img
						class="h-8 w-8 ml-4"
						src="@/assets/icons/logo.png"
						alt="Логотип"
					/>

					<div>
						<div class="font-bold text-grey-main ml-1">anuscript</div>
					</div>
				</button>

				<div class="flex space-x-4">
					<template v-for="item in navigationItems" :key="item.name">
						<li v-if="item.show" class="cursor-pointer">
							<a
								class="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 h-9"
								:class="{
									'navigation__active-link': item.isActive()
								}"
								@click.prevent="item.onClick()"
							>
								<template v-if="item.icon">
									<component :is="item.icon" />
								</template>
								<span>{{ item.text }}</span>
							</a>
						</li>
					</template>
				</div>
			</ul>
		</nav>
	</div>
</template>

<script lang="ts">
import { defineComponent, Component, onMounted, onUnmounted } from 'vue'
import { RouteRecordName, useRoute, useRouter } from 'vue-router'
import { EventsIcon, NotificationsIcon, TeamIcon } from './icons'
import ProfileIcon from './icons/ProfileIcon.vue'
import { AuthService } from '@/services/auth'

interface INavigationItem {
	name: string
	text?: string
	icon?: Component
	show: boolean
	isActive: () => boolean
	onClick: () => void
}

/**
 * Компонент с ссылками на главную, заказы и выход из приложения
 */
export default defineComponent({
	name: 'BaseNavigation',
	components: { TeamIcon },
	setup() {
		const route = useRoute()
		const router = useRouter()

		/**
		 * Переходит на другую страницу
		 * @param {string} name - Название роута
		 */
		const changeRoute = (name: string) => router.push({ name })

		const navigationItems: INavigationItem[] = [
			{
				name: 'Events',
				text: 'События',
				show: true,
				icon: EventsIcon,
				isActive: () => areRoutesActive(['Events']),
				onClick: () => changeRoute('Events')
			},
			{
				name: 'Notifications',
				text: 'Уведомления',
				show: AuthService.isAuthorized(),
				icon: NotificationsIcon,
				isActive: () => areRoutesActive(['Notifications']),
				onClick: () => changeRoute('Notifications')
			},
			{
				name: 'Profile',
				text: 'Профиль',
				show: AuthService.isAuthorized(),
				icon: ProfileIcon,
				isActive: () => areRoutesActive(['Profile']),
				onClick: () => changeRoute('Profile')
			},
			{
				name: 'Login',
				text: 'Войти',
				show: !AuthService.isAuthorized(),
				isActive: () => areRoutesActive(['Login']),
				onClick: () => changeRoute('Login')
			}
		]

		/**
		 * Проверяет активен ли текущий роут
		 * @param {string[]} routeNames - Названия роутов
		 */
		const areRoutesActive = (routeNames: RouteRecordName[]) => {
			return routeNames.includes(route.name || '')
		}

		onMounted(() => {
			window.addEventListener('scroll', () => {
				const navigation = document.querySelector('.navigation')
				if (navigation) {
					if (window.scrollY > 0) {
						navigation.classList.add('bg-white')
						navigation.classList.add('shadow')
					} else {
						navigation.classList.remove('bg-white')
						navigation.classList.remove('shadow')
					}
				}
			})
		})

		onUnmounted(() => window.removeEventListener('scroll', () => {}))

		return { navigationItems }
	}
})
</script>

<style lang="scss" scoped>
.navigation {
	&__active-link {
		color: #000000;
		svg path {
			stroke: #000000;
		}
	}
}
</style>
