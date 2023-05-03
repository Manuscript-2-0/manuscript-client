import { Event } from '@/types'
import { client } from '../../client'

export default function (location = ''): Promise<Event[]> {
	return client
		.get(`/events/${location ? `?location=${location}` : ''}`)
		.then(res => res.data)
		.catch(err => {
			throw err
		})
}
