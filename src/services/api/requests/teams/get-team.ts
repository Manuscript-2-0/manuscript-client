import { client } from '../../client'
import { Team } from '@/types'

export default function (id: number): Promise<Team> {
	return client
		.get(`/teams/${id}`)
		.then(res => res.data.data)
		.catch(err => {
			throw err
		})
}
