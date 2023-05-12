<template>
	<section class="px-10">
		<div v-if="!isLoading && team && userId">
			<UiActionBlock :title="team.name">
				<template #action>
					<div v-if="isLeaderOfTeam">
						<button
							class="bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded w-full"
							@click="goToEditTeam"
						>
							Редактировать команду
						</button>

						<button
							class="bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded w-full mt-2"
							@click="deleteTeam"
						>
							Удалить команду
						</button>
					</div>
				</template>
			</UiActionBlock>

			<div class="flex mt-4">
				<div class="bg-gray-50 w-full p-4 rounded-lg">
					<h3 class="text-lg text-gray-900 font-bold">Участники команды :</h3>
					<TeamMember
						v-for="member in team.participants"
						:key="member.user.id"
						:member="member"
						:is-deletable="isLeaderOfTeam && member.user.id !== userId"
						@delete-member="deleteMember"
					/>
					<div v-if="!team.participants.length">
						<p class="text-gray-600 text-sm">Нет участников</p>
					</div>
				</div>
				<div
					v-if="isAuth() && !isLeaderOfTeam"
					class="bg-gray-50 p-4 rounded-lg flex items-center justify-center ml-8 w-max"
				>
					<button
						v-if="
							team.user_participation_status ===
							EMembershipStatus.APPLIED_STATUS
						"
						class="bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded w-full"
						@click="leaveTeam"
					>
						Покинуть команду
					</button>
					<button
						v-if="!team.user_participation_status"
						class="bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded w-full mt-2"
						@click="joinTeam"
					>
						Вступить в команду
					</button>

					<div
						v-if="
							team.user_participation_status === EMembershipStatus.KICKED_STATUS
						"
					>
						<p class="text-red-500 text-center mt-2">
							Вы были исключены из команды
						</p>
					</div>
					<div v-else-if="team.user_participation_status && !isLeaderOfTeam">
						<p class="text-gray-600 text-center mt-2">
							{{ formatStatusText(team.user_participation_status) }}
						</p>
					</div>
				</div>
			</div>
			<div
				v-if="requestToJoinTeam?.length"
				class="bg-gray-50 w-full p-4 rounded-lg mt-2"
			>
				<h3 class="text-lg text-gray-900 font-bold">
					Запросы на вступление в команду:
				</h3>

				<TeamMember
					v-for="member in requestToJoinTeam"
					:key="member.user.id"
					class="mt-2"
					:member="member"
					is-requests
					@accept-member="acceptMember"
					@decline-member="declineMember"
				/>
			</div>
		</div>

		<div v-else class="flex w-full justify-center">
			<UiLoader />
		</div>
	</section>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UiLoader from '@/components/ui/UiLoader.vue'
import UiActionBlock from '@/components/ui/UiActionBlock.vue'
import TeamMember from '@/components/teams/TeamMember.vue'
import { TeamsService } from '@/services/teams'
import {
	EMembershipStatus,
	ITeamMemberStatusResponse
} from '@/services/teams/types'
import { UserService } from '@/services/user'
import { AuthService } from '@/services/auth'
import { INotificationPlugin } from '@/utils/plugins/toast'
import { formatStatusText } from '@/utils/helpers'

export default defineComponent({
	name: 'TeamDetails',
	components: { UiLoader, TeamMember, UiActionBlock },
	setup() {
		const route = useRoute()
		const router = useRouter()

		const teamId = route.params.id as string
		const isLeaderOfTeam = ref(false)
		const isLoading = ref(false)
		const userId = ref<number | null>(null)
		const requestToJoinTeam = ref<ITeamMemberStatusResponse[] | null>(null)

		const team = computed(() => TeamsService.state.team)

		const notification = inject('$notification') as INotificationPlugin

		const deleteMember = async (memberId: number) => {
			try {
				await TeamsService.deleteTeamMember(+teamId, memberId)
				await TeamsService.fetchTeamById(+teamId)
				notification.success('Участник успешно принят')
			} catch (e) {
				notification.error('Не удалось удалить участника')
			}
		}

		const acceptMember = async (memberId: number) => {
			try {
				await TeamsService.acceptMember(+teamId, memberId)
				requestToJoinTeam.value = await TeamsService.getPendingRequests(+teamId)
				notification.success('Участник успешно принят')
			} catch (e) {
				notification.error('Не удалось принять участника')
			}
		}

		const declineMember = async (memberId: number) => {
			try {
				await TeamsService.declineMember(+teamId, memberId)
				requestToJoinTeam.value = await TeamsService.getPendingRequests(+teamId)
				notification.success('Участник успешно отклонен')
			} catch (e) {
				notification.error('Не удалось отклонить участника')
			}
		}

		const deleteTeam = async () => {
			try {
				await TeamsService.deleteTeamById(+teamId)
				notification.success('Команда успешно удалена')
				router.replace('/events')
			} catch (e) {
				notification.error('Не удалось удалить команду')
			}
		}

		const goToEditTeam = () => {
			router.push(`/teams/edit/${teamId}`)
		}

		onMounted(async () => {
			try {
				isLoading.value = true
				userId.value = (await UserService.fetchProfile()).id
				await TeamsService.fetchTeamById(+teamId)
				requestToJoinTeam.value = await TeamsService.getPendingRequests(+teamId)
				isLeaderOfTeam.value = await TeamsService.isLeader()
			} catch (e) {
				console.log(e)
			} finally {
				isLoading.value = false
			}
		})

		return {
			team,
			userId,
			isLeaderOfTeam,
			isLoading,
			requestToJoinTeam,
			acceptMember,
			declineMember,
			deleteMember,
			goToEditTeam,
			deleteTeam,
			EMembershipStatus,
			formatStatusText,
			isAuth: () => AuthService.isAuthorized(),
			leaveTeam: () => TeamsService.leaveTeam(+teamId),
			joinTeam: () => TeamsService.joinTeam(+teamId)
		}
	}
})
</script>
