<template>
	<form class="px-10" @submit.prevent="onSubmit">
		<div class="flex flex-col justify-center items-center px-4 py-2">
			<div class="flex flex-col justify-center items-center">
				<h1 v-if="!isEdit" class="text-3xl font-bold text-gray-800">
					Создание мероприятия
				</h1>
				<h1 v-else class="text-3xl font-bold text-gray-800">
					Редактирование мероприятия
				</h1>
				<p class="text-gray-600 text-xl mt-4">
					Manuscript- сервис для студентов по поиску команд, проектов и
					сотрудников. На платформе каждый студент заявляет о проекте над
					которым работает, либо присоединяется к уже заявленным и таким образом
					увеличивает “арсенал” возможностей команды
				</p>
			</div>

			<div
				v-if="event && !isLoading"
				class="flex flex-col justify-center items-center w-full py-4"
			>
				<div
					class="flex flex-col items-center justify-between w-full space-y-4 md:space-y-0 md:space-x-4 md:flex-row"
				>
					<UiInput
						v-model="event.name"
						title="Название"
						type="text"
						placeholder="Введите название мероприятия"
					/>

					<UiInput
						v-model="event.location"
						title="Место проведения"
						type="text"
						placeholder="Ссылку или адрес"
					/>
				</div>

				<div
					class="flex flex-col items-center justify-between w-full space-y-4 md:space-y-0 md:space-x-4 md:flex-row mt-4"
				>
					<UiInput
						v-model="event.start_date"
						title="Дата начала"
						type="date"
						placeholder="Введите дату начала"
					/>

					<UiInput
						v-model="event.end_date"
						title="Дата окончания"
						type="date"
						placeholder="Введите дату окончания"
					/>
				</div>

				<div
					class="flex flex-col items-center justify-between w-full space-y-4 md:space-y-0 md:space-x-4 md:flex-row mt-4"
				>
					<UiInput
						v-model="event.location_url"
						title="Ссылка на место проведения"
						type="text"
						placeholder="Введите ссылку на место проведения"
					/>
					<UiInput
						v-model="event.description"
						title="Краткое описание"
						type="text"
						placeholder="Введите краткое описание"
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

			<UiLoader v-if="isLoading" />
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import UiInput from '@/components/ui/UiInput.vue'
import { EventsService } from '@/services/events'
import { Event, IEventCreatePayload } from '@/types'
import UiLoader from '@/components/ui/UiLoader.vue'

export default defineComponent({
	name: 'EventCreate',
	components: { UiInput, UiLoader },
	setup() {
		const route = useRoute()
		const teamId = +route.params.teamId || 0
		const eventId = +route.params.eventId || 0
		const isLoading = ref(false)

		const newEvent = ref<IEventCreatePayload>({
			name: '',
			image: null,
			location: '',
			location_url: '',
			description: '',
			start_date: '',
			end_date: '',
			full_description: '',
			tags: []
		})

		const event = ref<Event | null>(null)

		const fetchEventById = async (id: number) => {
			event.value = await EventsService.fetchEventById(id)
		}

		const onSubmit = async () => {
			if (eventId && event.value) {
				try {
					await EventsService.editEventById(event.value)
				} catch (e) {
					console.log('Не удалось обновить команду')
				}
			} else {
				try {
					await EventsService.createEvent(newEvent.value)
				} catch (e) {
					console.log('Не удалось создать команду')
				}
			}
		}

		onMounted(async () => {
			if (eventId) {
				try {
					isLoading.value = true
					await fetchEventById(teamId)
				} finally {
					isLoading.value = false
				}
			}
		})

		return {
			event: eventId ? event.value : newEvent.value,
			onSubmit,
			isLoading,
			isEdit: !!teamId
		}
	}
})
</script>
