import { IUser } from '..'

export interface INotification {
	id: number
	user: IUser
	message: string
	status: ENotificationStatus
	created_at: string
	updated_at: string
}

export enum ENotificationStatus {
	WARNING_TYPE = 'warning',
	SUCCESS_TYPE = 'success',
	DANGER_TYPE = 'danger'
}
