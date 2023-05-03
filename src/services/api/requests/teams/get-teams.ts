import { Team } from '@/types'
import { client } from '../../client'

export default function (eventId: string = ''): Promise<Team[]> {
	return client
		.get(`/teams/${eventId ? `?event_id=${eventId}` : ''}`)
		.then(res => res.data.data)
		.catch(err => {
			throw err
		})
}
