import { reactive, readonly } from 'vue'
import {
	getTeams,
	deleteTeam,
	editTeam,
	getTeam,
	createTeam as _createTeam,
	joinTeam as _joinTeam,
	leaveTeam as _leaveTeam,
	deleteTeamMember as _deleteTeamMember,
	changeMemberStatus as _changeMemberStatus,
	getTeamMembers
} from '../api'

import {
	EMembershipStatus,
	IState,
	ITeamCreatePayload,
	ITeamsService
} from './types'
import { Team } from '@/types'
import { UserService } from '../user'
import { AuthService } from '../auth'

const state = reactive<IState>({
	teams: null,
	team: null
})

const fetchTeams = async (eventId: string = '') => {
	return await getTeams(eventId)
}

const deleteTeamById = async (id: number) => {
	return await deleteTeam(id)
}

const editTeamById = async (team: Team) => {
	return await editTeam({
		name: team.name,
		id: team.id,
		image: team.image
	})
}

const createTeam = async (team: ITeamCreatePayload, eventId: number) => {
	return await _createTeam(team, eventId)
}

const fetchTeamById = async (id: number) => {
	const res = await getTeam(id)
	state.team = res
	return res
}

const joinTeam = async (teamId: number) => {
	return await _joinTeam(teamId)
}

const leaveTeam = async (teamId: number) => {
	return await _leaveTeam(teamId)
}

const deleteTeamMember = async (teamId: number, userId: number) => {
	return await _deleteTeamMember(teamId, userId)
}

const changeMemberStatus = async (
	teamId: number,
	userId: number,
	status: EMembershipStatus
) => {
	return await _changeMemberStatus(teamId, userId, status)
}

const acceptMember = async (teamId: number, userId: number) => {
	return await changeMemberStatus(
		+teamId,
		userId,
		EMembershipStatus.APPLIED_STATUS
	)
}

const declineMember = async (teamId: number, userId: number) => {
	return await changeMemberStatus(
		+teamId,
		userId,
		EMembershipStatus.DECLINED_STATUS
	)
}

const getPendingRequests = async (teamId: number) => {
	return await getTeamMembers(teamId)
}

const getTeamLeader = (team: Team) => {
	return team.participants.find(member => member.role === 'LEADER')?.user
}

const isLeader = async () => {
	if (AuthService.isAuthorized() && !UserService.state.profile) {
		await UserService.fetchProfile()
	}

	const leader = getTeamLeader(state.team as Team)

	return leader?.id === UserService.state.profile?.id
}

const TeamsService: ITeamsService = {
	state: readonly(state) as IState,
	fetchTeams,
	fetchTeamById,
	editTeamById,
	deleteTeamById,
	createTeam,
	joinTeam,
	leaveTeam,
	deleteTeamMember,
	changeMemberStatus,
	getTeamLeader,
	getPendingRequests,
	acceptMember,
	declineMember,
	isLeader
}

export { TeamsService }
