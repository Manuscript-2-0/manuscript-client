import { IUser } from '@/types'
import { Team } from '@/types/teams'

export interface IState {
	teams: Team[] | null
	team: Team | null
}

export interface ITeamsService {
	state: IState
	fetchTeams: () => Promise<Team[]>
	fetchTeamById: (id: number) => Promise<Team>
	editTeamById: (team: ITeamCreatePayload) => Promise<Team>
	deleteTeamById: (id: number) => Promise<void>
	createTeam: (team: ITeamCreatePayload, eventId: number) => Promise<Team>
}

export interface ITeamCreatePayload {
	id?: number
	name: string
	image: string
	location: string
	location_url: string
}

export enum EMembershipStatus {
	PENDING_STATUS = 'PENDING',
	APPLIED_STATUS = 'APPLIED',
	DECLINED_STATUS = 'DECLINED',
	KICKED_STATUS = 'KICKED',
	LEFT_STATUS = 'LEFT'
}

export interface ITeamMemberStatusResponse {
	id: number
	team: Team
	user: IUser
	role: 'MEMBER' | 'LEADER'
	status: EMembershipStatus
}
