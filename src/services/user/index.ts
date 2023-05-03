import { IUser } from '@/types'
import { reactive, readonly } from 'vue'
import { getMe } from '../api'
import { AuthService } from '../auth'

interface IState {
	profile: IUser | null
}

const state = reactive<IState>({
	profile: null
})

const fetchProfile = async () => {
	const profile = await getMe()
	state.profile = profile
	return profile
}

const generateInviteLink = async () => {
	const link = window.location.origin

	if (!state.profile && AuthService.isAuthorized()) {
		await fetchProfile()
	}

	const referral = state.profile ? `?ref=${state.profile.id}` : ''

	return link + referral
}

const UserService = {
	state: readonly(state),
	fetchProfile,
	generateInviteLink
}

export { UserService }
