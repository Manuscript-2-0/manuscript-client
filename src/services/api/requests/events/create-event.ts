import { IEvent, IEventCreatePayload } from '@/types'
import { client } from '../../client'

export default function (payload: IEventCreatePayload): Promise<IEvent> {
	const formData = new FormData()

	payload.start_date = (payload.start_date as unknown as Date)
		.toISOString()
		.split('T')[0]
	payload.end_date = (payload.end_date as unknown as Date)
		.toISOString()
		.split('T')[0]
	payload.image = ''

	Object.entries(payload).forEach(([key, value]) => {
		formData.append(key, value)
	})

	return client
		.post('/events/', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		.then(res => res.data)
		.catch(err => {
			throw err
		})
}
