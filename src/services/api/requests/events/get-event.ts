import { client } from '../../client'
import { Event } from '@/types'

export default function (id: number): Promise<Event> {
	return client
		.get(`/event/${id}/`)
		.then(res => res.data)
		.catch(err => {
			throw err
		})
}
