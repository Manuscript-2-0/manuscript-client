import { Team } from '@/types'
import { client } from '../../client'
import { ITeamCreatePayload } from '@/services/teams/types'

export default function (payload: ITeamCreatePayload): Promise<Team> {
	return client
		.put(`/teams/${payload.id}`, payload)
		.then(res => res.data)
		.catch(err => {
			throw err
		})
}
