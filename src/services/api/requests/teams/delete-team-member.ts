import { client } from '../../client'
import { ITeamMemberStatusResponse } from '@/services/teams/types'

export default function (
	teamId: number,
	userId: number
): Promise<ITeamMemberStatusResponse> {
	return client
		.delete(`/teams/${teamId}/participants/${userId}`)
		.then(res => res.data)
		.catch(err => {
			throw err
		})
}
