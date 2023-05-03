import { client } from '../../client'
import {
	EMembershipStatus,
	ITeamMemberStatusResponse
} from '@/services/teams/types'

export default function (
	teamId: number,
	memberId: number,
	status: EMembershipStatus
): Promise<ITeamMemberStatusResponse> {
	return client
		.put(`/teams/${teamId}/participants/${memberId}`, {
			status
		})
		.then(res => res.data)
		.catch(err => {
			throw err
		})
}
