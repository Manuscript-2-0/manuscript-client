<template>
	<form class="px-10" novalidate @submit.prevent="onSubmit">
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
						required
					/>

					<UiInput
						v-model="event.location"
						title="Место проведения"
						type="text"
						placeholder="Адрес места проведения"
						required
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
						:has-error="!isLinkValid && isFormSubmitted"
					>
						<template v-if="!isLinkValid" #error>
							<div>Неверный формат ссылки</div>
						</template>
					</UiInput>
					<UiInput
						v-model="event.description"
						title="Краткое описание"
						type="text"
						maxlength="100"
						placeholder="Введите краткое описание"
						required
					/>
				</div>

				<div class="w-full mt-4">
					<UiTextarea
						v-model="event.full_description"
						placeholder="Введите полное описание"
					/>
				</div>

				<div
					class="flex flex-col items-center w-full space-y-4 md:space-y-0 md:space-x-4 md:flex-row mt-4 bg-gray-100 p-4 rounded-lg"
				>
					<div class="flex flex-col w-full">
						<label for="start_date"> Дата начала </label>
						<Calendar
							id="start_date"
							v-model="event.start_date"
							class="mt-2"
							show-icon
							required
						/>
					</div>

					<div class="flex flex-col w-full">
						<label for="end_date"> Дата окончания </label>
						<Calendar
							id="end_date"
							v-model="event.end_date"
							class="mt-2"
							show-icon
							required
						/>
					</div>
				</div>

				<div
					class="bg-gray-100 w-full space-y-4 md:space-y-0 md:space-x-4 md:flex-row mt-4 p-4 rounded-lg"
				>
					<BaseFileUploader
						id="image"
						accept="image/*"
						class="mt-2"
						@select="onImageSelect"
					/>
				</div>

				<div class="mt-10">
					<button
						class="bg-black text-white font-bold py-3 px-6 rounded-lg text-xl"
					>
						<template v-if="!isEdit"> Создать </template>
						<template v-else> Сохранить </template>
					</button>
				</div>
			</div>

			<UiLoader v-if="isLoading" />
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UiInput from '@/components/ui/UiInput.vue'
import { EventsService } from '@/services/events'
import { IEvent, IEventCreatePayload } from '@/types'
import Calendar from 'primevue/calendar'
import UiLoader from '@/components/ui/UiLoader.vue'
import { INotificationPlugin } from '@/utils/plugins/toast'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import BaseFileUploader from '@/components/base/BaseFileUploader.vue'
import { useFormValidator } from '@/utils/composables'

export default defineComponent({
	name: 'EventCreate',
	components: { UiInput, UiLoader, Calendar, UiTextarea, BaseFileUploader },
	setup() {
		const route = useRoute()
		const router = useRouter()
		const { isLinkValid } = useFormValidator()
		const eventId = +route.params.id
		const isLoading = ref(false)
		const isFormSubmitted = ref(false)

		const newEvent = ref<IEventCreatePayload>({
			name: '',
			image: '',
			location: '',
			location_url: '',
			description: '',
			start_date: '',
			end_date: '',
			full_description: '',
			tags: ''
		})

		const event = ref<IEvent | null>(null)

		const notification = inject('$notification') as INotificationPlugin

		const fetchEventById = async (id: number) => {
			event.value = await EventsService.fetchEventById(id)
		}

		const onImageSelect = (file: File) => {
			newEvent.value.image = file as any
		}

		const isFormValid = () => {
			if (eventId) {
				const linkValid =
					newEvent.value.location_url &&
					isLinkValid(newEvent.value.location_url)
				return event.value?.start_date && event.value && linkValid
			}

			const linkValid =
				newEvent.value.location_url && isLinkValid(newEvent.value.location_url)

			return newEvent.value.start_date && newEvent.value && linkValid
		}

		const onSubmit = async () => {
			if (!isFormValid()) {
				isFormSubmitted.value = true
				return
			}

			if (eventId && event.value) {
				try {
					await EventsService.editEventById(event.value, +eventId)
					notification.success('Мероприятие успешно обновлено')
					router.push('/events')
				} catch (e) {
					notification.error('Не удалось обновить мероприятие')
				}
			} else {
				try {
					await EventsService.createEvent(newEvent.value)
					notification.success('Мероприятие успешно создано')
					router.push('/events')
				} catch (e) {
					notification.error('Не удалось создать мероприятие')
				}
			}
		}

		onMounted(async () => {
			if (eventId) {
				try {
					isLoading.value = true
					await fetchEventById(eventId)
				} finally {
					isLoading.value = false
				}
			}
		})

		return {
			event: eventId ? event : newEvent,
			onSubmit,
			isLoading,
			isEdit: !!eventId,
			onImageSelect,
			isFormSubmitted,
			isLinkValid: computed(() => {
				return eventId
					? isLinkValid(event.value?.location_url || '')
					: isLinkValid(newEvent.value.location_url)
			})
		}
	}
})
</script>
