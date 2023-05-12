<template>
	<form class="px-10" @submit.prevent="onSubmit">
		<div class="flex flex-col justify-center items-center px-4 py-2">
			<div class="flex flex-col justify-center items-center">
				<h1 v-if="!isEdit" class="text-3xl font-bold text-gray-800">
					Создание команды
				</h1>
				<h1 v-else class="text-3xl font-bold text-gray-800">
					Редактирование команды
				</h1>
				<p class="text-gray-600 text-xl mt-4">
					Manuscript- сервис для студентов по поиску команд, проектов и
					сотрудников. На платформе каждый студент заявляет о проекте над
					которым работает, либо присоединяется к уже заявленным и таким образом
					увеличивает “арсенал” возможностей команды
				</p>
			</div>

			<div
				v-if="team"
				class="flex flex-col justify-center items-center w-full py-4"
			>
				<div
					class="flex flex-col items-center justify-between w-full space-y-4 md:space-y-0 md:space-x-4 md:flex-row"
				>
					<UiInput
						v-model="team.name"
						title="Название команды"
						type="text"
						placeholder="Введите название команды"
					/>

					<UiInput
						v-model="team.image"
						title="Изображение команды"
						type="text"
						placeholder="Введите ссылку на изображение"
					/>
				</div>

				<div class="mt-10">
					<button
						class="bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded"
					>
						<template v-if="!isEdit"> Создать команду </template>
						<template v-else> Сохранить </template>
					</button>
				</div>
			</div>

			<div v-else class="py-10">
				<UiLoader />
			</div>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ITeamCreatePayload } from '@/services/teams/types'
import { TeamsService } from '@/services/teams'
import UiInput from '@/components/ui/UiInput.vue'
import { INotificationPlugin } from '@/utils/plugins/toast'
import { Team } from '@/types'
import UiLoader from '@/components/ui/UiLoader.vue'

export default defineComponent({
	name: 'TeamCreate',
	components: { UiInput, UiLoader },
	setup() {
		const route = useRoute()
		const router = useRouter()
		const teamId = +route.params.id || 0
		const eventId = +route.params.eventId || 0

		const team = ref<ITeamCreatePayload>({
			name: '',
			image: ''
		})

		const teamEdit = ref<Team | null>(null)

		const notification = inject('$notification') as INotificationPlugin

		const fetchTeam = async (id: number) => {
			teamEdit.value = await TeamsService.fetchTeamById(id)
		}

		const onSubmit = async () => {
			if (teamId && teamEdit.value) {
				try {
					await TeamsService.editTeamById(teamEdit.value)
					notification.success('Команда успешно обновлена')
					router.push('/teams/' + teamId)
				} catch (e) {
					notification.error('Не удалось обновить команду')
				}
			} else {
				try {
					await TeamsService.createTeam(team.value, eventId)
					notification.success('Команда успешно создана')
					router.push('/events/' + eventId)
				} catch (e) {
					notification.error('Не удалось создать команду')
				}
			}
		}

		onMounted(async () => {
			if (teamId) {
				await fetchTeam(teamId)
			}
		})

		return {
			team: teamId ? teamEdit : team,
			onSubmit,
			isEdit: !!teamId
		}
	}
})
</script>
