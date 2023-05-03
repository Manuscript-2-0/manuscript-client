import { IUser } from '@/types'
import { Team } from '@/types/teams'

export interface IState {
	teams: Team[] | null
	team: Team | null
}

export interface ITeamsService {
	state: IState
	fetchTeams: (eventId?: string) => Promise<Team[]>
	fetchTeamById: (id: number) => Promise<Team>
	editTeamById: (team: Team) => Promise<Team>
	deleteTeamById: (id: number) => Promise<void>
	createTeam: (team: ITeamCreatePayload, eventId: number) => Promise<Team>
	joinTeam: (teamId: number) => Promise<ITeamMemberStatusResponse>
	leaveTeam: (teamId: number) => Promise<ITeamMemberStatusResponse>
	deleteTeamMember: (
		teamId: number,
		userId: number
	) => Promise<ITeamMemberStatusResponse>
	changeMemberStatus: (
		teamId: number,
		userId: number,
		status: EMembershipStatus
	) => Promise<ITeamMemberStatusResponse>
	getTeamLeader: (team: Team) => IUser | undefined
	isLeader: () => Promise<boolean>
	getPendingRequests: (teamId: number) => Promise<ITeamMemberStatusResponse[]>
	acceptMember: (
		teamId: number,
		userId: number
	) => Promise<ITeamMemberStatusResponse>
	declineMember: (
		teamId: number,
		userId: number
	) => Promise<ITeamMemberStatusResponse>
}

export interface ITeamCreatePayload {
	id?: number
	name: string
	image: string
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
