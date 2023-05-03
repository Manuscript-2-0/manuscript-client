import { client } from '../../client'
import { ITeamMemberStatusResponse } from '@/services/teams/types'

export default function (teamId: number): Promise<ITeamMemberStatusResponse> {
	return client
		.delete(`/teams/${teamId}/participants/`)
		.then(res => res.data)
		.catch(err => {
			throw err
		})
}
