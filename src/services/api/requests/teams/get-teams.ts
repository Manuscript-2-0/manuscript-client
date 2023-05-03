import { Team } from '@/types'
import { client } from '../../client'

export default function (): Promise<Team[]> {
	return client
		.get(`/teams/`)
		.then(res => res.data)
		.catch(err => {
			throw err
		})
}
