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

			<div class="flex flex-col justify-center items-center w-full py-4">
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

				<div
					class="flex flex-col items-center justify-between w-full space-y-4 mt-4 md:space-y-0 md:space-x-4 md:flex-row"
				>
					<UiInput
						v-model="team.location"
						title="Местоположение"
						type="text"
						placeholder="Введите местоположение"
					/>

					<UiInput
						v-model="team.location_url"
						title="Ссылка на место проведения"
						type="text"
						placeholder="Введите ссылку на место проведения"
					/>
				</div>

				<div class="mt-10">
					<button
						class="bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded"
					>
						Создать
					</button>
				</div>
			</div>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ITeamCreatePayload } from '@/services/teams/types'
import { TeamsService } from '@/services/teams'
import UiInput from '@/components/ui/UiInput.vue'

export default defineComponent({
	name: 'TeamCreate',
	components: { UiInput },
	setup() {
		const route = useRoute()
		const teamId = +route.params.id || null
		const eventId = +route.params.eventId || 0

		const team = ref<ITeamCreatePayload>({
			name: '',
			image: '',
			location: '',
			location_url: ''
		})

		const fetchTeam = async (id: number) => {
			team.value = await TeamsService.fetchTeamById(id)
		}

		const onSubmit = async () => {
			if (teamId) {
				try {
					await TeamsService.editTeamById(team.value)
				} catch (e) {
					console.log('Не удалось обновить команду')
				}
			} else {
				try {
					await TeamsService.createTeam(team.value, eventId)
				} catch (e) {
					console.log('Не удалось создать команду')
				}
			}
		}

		onMounted(async () => {
			if (teamId) {
				await fetchTeam(teamId)
			}
		})

		return {
			team,
			onSubmit,
			isEdit: !!teamId
		}
	}
})
</script>
