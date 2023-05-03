import { client } from '../../client'

export default function (id: number): Promise<void> {
	return client
		.delete(`/events/${id}`)
		.then(res => res.data)
		.catch(err => {
			throw err
		})
}
