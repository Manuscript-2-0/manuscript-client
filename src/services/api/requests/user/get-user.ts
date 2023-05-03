import { IUser } from '@/types'
import { client } from '../../client'

/**
 * Запрос на получение данных пользователя
 * @param id - id пользователя
 */
export default function (id: number): Promise<IUser> {
	return client
		.get(`/user/${id}/`)
		.then(res => res.data)
		.catch(err => {
			throw err
		})
}
