import { Event, IEventCreatePayload } from '@/types'
import { client } from '../../client'

export default function (payload: IEventCreatePayload): Promise<Event> {
	return client
		.post('/events/', payload)
		.then(res => res.data)
		.catch(err => {
			throw err
		})
}
