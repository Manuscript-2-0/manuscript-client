import { client } from '../../client'

export default function (id: number): Promise<void> {
	return client
		.delete(`/teams/${id}`)
		.then(res => res.data)
		.catch(err => {
			throw err
		})
}
