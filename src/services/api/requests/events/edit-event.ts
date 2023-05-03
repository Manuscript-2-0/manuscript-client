import { Event } from '@/types'
import { client } from '../../client'

export default function (payload: Event): Promise<Event> {
	return client
		.put(`/event/${payload.id}/`, payload)
		.then(res => res.data)
		.catch(err => {
			throw err
		})
}
