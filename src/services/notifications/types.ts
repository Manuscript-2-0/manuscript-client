import { INotification } from '@/types'

export interface IState {
	notifications: INotification[]
}

export interface INotificationsService {
	state: IState
	fetchNotifications: () => Promise<INotification[]>
}
