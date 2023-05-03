import { createApp } from 'vue'
import UiNotification from '@/components/ui/UiNotification.vue'

export interface NotificationAction {
	text: string
	callback: () => void
}

export interface Notification {
	key: string
	action?: NotificationAction
	type?: string
	icon?: string
	text: string
}

export interface INotificationPlugin {
	notifications: Notification
	remove(notification: Notification): void
	show(
		options: Omit<Notification, 'key'> | string,
		duration?: number,
		action?: NotificationAction
	): void
	success(text: string, duration?: number, action?: NotificationAction): void
	error(text: string, duration?: number, action?: NotificationAction): void
}

const notificationPlugin = {
	install(app: any) {
		const mountPoint = document.createElement('div')
		document.body.appendChild(mountPoint)
		const container = createApp(UiNotification).mount(mountPoint)
		app.config.globalProperties.$notification = container
		app.provide('$notification', container)
	}
}

export { notificationPlugin }
