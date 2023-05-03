import { client } from '../../client'
import { IEvent } from '@/types'
import { eventAdapter } from './adapters'

export default function (id: number): Promise<IEvent> {
	return client
		.get(`/events/${id}`)
		.then(res => eventAdapter(res.data.data))
		.catch(err => {
			throw err
		})
}
