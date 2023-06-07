import { INotification } from '@/types'
import { client } from '../../client'

export default function (): Promise<INotification[]> {
	return client
		.get(`/notifications/`)
		.then(res => res.data.data)
		.catch(err => {
			throw err
		})
}
