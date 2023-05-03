import { client } from '../../client'
import { INotification } from '@/types'

export default function (id: number): Promise<INotification> {
	return client
		.get(`/notifications/${id}`)
		.then(res => res.data)
		.catch(err => {
			throw err
		})
}
