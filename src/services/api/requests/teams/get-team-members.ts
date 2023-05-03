import { client } from '../../client'
import { ITeamMemberStatusResponse } from '@/services/teams/types'

export default function (teamId: number): Promise<ITeamMemberStatusResponse[]> {
	return client
		.get(`/teams/${teamId}/participants`)
		.then(res => res.data.data)
		.catch(err => {
			throw err
		})
}
