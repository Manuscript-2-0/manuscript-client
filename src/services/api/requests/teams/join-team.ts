import { client } from '../../client'
import { ITeamMemberStatusResponse } from '@/services/teams/types'

export default function (teamId: number): Promise<ITeamMemberStatusResponse> {
	return client
		.post(`/teams/${teamId}/participants`)
		.then(res => res.data)
		.catch(err => {
			throw err
		})
}
