import { EMembershipStatus } from '@/services/teams/types'

interface Event {
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
	members: Member[]
	event: Event

	name: string
	image: string
	location: string
	location_url: string
	is_active: boolean
	user_participation_status: EMembershipStatus
}

export interface Member {
	id: number
	name: string
	email: string
}
