import { IEvent, IEventCreatePayload } from '@/types'
import { client } from '../../client'

export default function (
	payload: IEventCreatePayload,
	id: number
): Promise<IEvent> {
	const formData = new FormData()
	payload.image = ''

	Object.entries(payload).forEach(([key, value]) => {
		formData.append(key, value)
	})

	return client
		.put(`/events/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		.then(res => res.data)
		.catch(err => {
			throw err
		})
}
