import { EMembershipStatus } from '@/services/teams/types'
import { IUser } from '..'

interface IEvent {
	id: number
	title: string
	description: string
	start_time: string
	end_time: string
	location: string
}

export interface Team {
	id: number
	team_name: string
	participants: IMember[]
	event: IEvent

	name: string
	image: string
	location: string
	location_url: string
	is_active: boolean
	user_participation_status: EMembershipStatus
}

export interface IMember {
	id: number
	role: 'MEMBER' | 'LEADER'
	status: EMembershipStatus
	user: IUser
	team: Team
}
