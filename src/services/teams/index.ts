import { reactive, readonly } from 'vue'
import {
	getTeams,
	deleteTeam,
	editTeam,
	getTeam,
	createTeam as _createTeam
} from '../api'

import { IState, ITeamCreatePayload, ITeamsService } from './types'

const state = reactive<IState>({
	teams: null,
	team: null
})

const fetchTeams = async () => {
	return await getTeams()
}

const deleteTeamById = async (id: number) => {
	return await deleteTeam(id)
}

const editTeamById = async (team: ITeamCreatePayload) => {
	return await editTeam(team)
}

const createTeam = async (team: ITeamCreatePayload, eventId: number) => {
	return await _createTeam(team, eventId)
}

const fetchTeamById = async (id: number) => {
	return await getTeam(id)
}

const TeamsService: ITeamsService = {
	state: readonly(state) as IState,
	fetchTeams,
	fetchTeamById,
	editTeamById,
	deleteTeamById,
	createTeam
}

export { TeamsService }
