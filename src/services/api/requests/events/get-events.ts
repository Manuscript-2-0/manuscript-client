import { IEvent, IEventResponse } from '@/types'
import { client } from '../../client'
import { eventAdapter } from './adapters'

export default function (location = ''): Promise<IEvent[]> {
	return client
		.get(`/events/${location ? `?location=${location}` : ''}`)
		.then(res => res.data.data.map((el: IEventResponse) => eventAdapter(el)))
		.catch(err => {
			throw err
		})
}
