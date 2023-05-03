import axios from 'axios'

import { INotification } from '@/types'

export default function (): Promise<INotification[]> {
	return axios
		.get(`${import.meta.env.VITE_API_PROXY}:16040/notifications/`, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.data)
		.catch(err => {
			throw err
		})
}
