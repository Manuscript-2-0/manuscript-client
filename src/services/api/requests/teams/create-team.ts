import { client } from '../../client'
import { Team } from '@/types'
import { ITeamCreatePayload } from '@/services/teams/types'

export default function (
	payload: ITeamCreatePayload,
	eventId: number
): Promise<Team> {
	return client
		.post(`/teams/?event_id=${eventId}`, payload)
		.then(res => res.data)
		.catch(err => {
			throw err
		})
}
