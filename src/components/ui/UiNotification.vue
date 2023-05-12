<template>
	<div
		class="fixed z-50 top-0 right-0 bottom-0 flex flex-col p-4 font-sirius pointer-events-none"
	>
		<TransitionGroup :name="transition">
			<div
				v-for="item in notifications"
				:key="item.key"
				class="notification flex flex-col mb-2 last:mb-0 px-4 py-4 rounded-3xl pointer-events-auto base-shadow"
				:class="item.type ? `notification--${item.type}` : ''"
				@click="remove(item)"
			>
				<div class="flex flex-1 items-center justify-between">
					<span class="text-base">{{ item.text }}</span>
					<span
						v-if="item.icon"
						class="w-9 h-9 flex-shrink-0 ml-2 rounded-xl"
						:style="{ background: `url('${item.icon}')` }"
					></span>
				</div>

				<button
					v-if="item.action"
					class="notification__btn block w-full mt-3 pt-2 px-2 pb-2.5 text-base font-medium rounded-xl"
					@click="item.action.callback"
				>
					{{ item.action.text }}
				</button>
			</div>
		</TransitionGroup>
	</div>
</template>

<script lang="ts">
import { ref, defineComponent, Ref } from 'vue'
import successIcon from '@/assets/icons/success-mark.svg'
import errorIcon from '@/assets/icons/error-mark.svg'
import { Notification, NotificationAction } from '@/utils/plugins/toast'

export default defineComponent({
	name: 'UiNotification',
	props: {
		transition: {
			type: String,
			default: 'slide-fade'
		},
		duration: {
			type: Number,
			default: 3000
		}
	},
	setup(props) {
		const notifications: Ref<Notification[]> = ref([])

		/**
		 * Удаление уведомления
		 * @param {Notification} notification
		 */
		const remove: (notification: Notification) => void = notification => {
			const i: number = notifications.value.indexOf(notification)

			if (i >= 0) {
				notifications.value.splice(i, 1)
			}
		}

		const show: (
			message: Omit<Notification, 'key'> | string,
			duration?: number,
			action?: NotificationAction
		) => void = (message, duration = props.duration, action) => {
			let type = ''
			let icon = ''
			let text = ''

			if (typeof message === 'object') {
				type = message.type || ''
				icon = message.icon || ''
				text = message.text || ''
			} else {
				text = message
			}

			const notification: Notification = {
				key: `${Date.now()}-${Math.random()}`,
				action,
				type,
				icon,
				text
			}

			notifications.value.push(notification)
			setTimeout(() => remove(notification), duration)
		}

		/**
		 * Создание уведомления
		 * @param {string} text - Сообщение
		 * @param {number} duration - Длительность
		 * @param {notificationAction|undefined} action - Параметры действия
		 */
		const success = (
			text: string,
			duration: number = props.duration,
			action?: NotificationAction
		): void => {
			const options = {
				type: 'success',
				icon: successIcon,
				text
			}

			show(options, duration, action)
		}

		const error = (
			text: string,
			duration: number = props.duration,
			action?: NotificationAction
		): void => {
			const options = {
				type: 'error',
				icon: errorIcon,
				text
			}

			show(options, duration, action)
		}

		return {
			notifications,
			remove,
			show,
			success,
			error
		}
	}
})
</script>

<style lang="scss" scoped>
.notification {
	min-height: 68px;
	color: #fff;
	background: #000;

	&__btn {
		color: #000;
		background: #fff;
	}

	&--success {
		color: #fff;
		background: #22c55e;

		.notification__btn {
			color: #fff;
			background: #000;
		}
	}
}
</style>
