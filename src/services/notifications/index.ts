import { reactive, readonly } from 'vue'
import { IState, INotificationsService } from './types'
import { INotification } from '@/types'
import { getNotifications } from '../api'

const state = reactive<IState>({
	notifications: []
})

const fetchNotifications = async (): Promise<INotification[]> => {
	return await getNotifications()
}

const NotificationsService: INotificationsService = {
	state: readonly(state) as IState,
	fetchNotifications
}

export { NotificationsService }
