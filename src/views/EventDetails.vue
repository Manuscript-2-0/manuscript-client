<template>
	<div class="px-10 pb-5">
		<div v-if="!isLoading && event">
			<UiActionBlock :title="event.name">
				<template #action>
					<div class="flex flex-col">
						<router-link
							v-if="!isOwner"
							:to="`/teams/create/${eventId}`"
							class="bg-black text-white font-bold py-3 px-4 rounded-lg w-full"
						>
							Создать тут команду
						</router-link>

						<router-link
							v-if="isOwner"
							:to="`/events/edit/${eventId}`"
							class="bg-black text-white font-bold py-3 px-4 rounded-lg w-full"
						>
							Редактировать
						</router-link>

						<button
							v-if="isOwner"
							class="bg-black text-white font-bold py-3 px-4 rounded-lg w-full mt-2"
							@click="deleteEvent"
						>
							Удалить
						</button>
					</div>
				</template>
			</UiActionBlock>
			<div
				class="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 rounded-lg mt-4"
			>
				<div class="p-8 md:p-12 lg:px-16 lg:py-24">
					<div class="mx-auto max-w-xl ltr:sm:text-left rtl:sm:text-right">
						<h2 class="text-2xl font-bold text-gray-900 md:text-3xl">
							{{ event.name }}
						</h2>

						<p class="hidden text-gray-500 md:mt-4 md:block">
							{{ event.full_description }}
						</p>
					</div>
				</div>

				<img
					alt="Student"
					src="https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
					class="h-56 w-full object-cover sm:h-full"
				/>
			</div>

			<div class="mt-4 bg-gray-50 p-4 rounded-lg">
				<h3 class="text-lg text-gray-900 font-bold">Информация:</h3>
				<div class="mt-4 text-gray-500">
					<p class="mt-2">О проекте: {{ event.full_description }}</p>

					<p class="mt-2">Где: {{ event.location }}</p>
					<p class="mt-2">
						Ссылка:
						<a
							class="text-blue-500 italic underline"
							:href="event.location_url"
							>{{ event.location_url }}</a
						>
					</p>
					<p class="mt-2">Дата начала: {{ event.start_date }}</p>
					<p class="mt-2">Дата начала: {{ event.end_date }}</p>
					<p v-if="event.tags.length" class="mt-2">
						Категории: {{ event.tags.join(', ') }}
					</p>
				</div>
			</div>

			<div v-if="eventTeams.length" class="mt-4 bg-gray-50 p-4 rounded-lg">
				<h3 class="text-lg text-gray-900 font-bold">
					Команды: {{ eventTeams.length }}
				</h3>

				<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<router-link
						v-for="team in eventTeams"
						:key="team.id"
						:to="`/teams/${team.id}`"
					>
						<TeamCard :team="team" />
					</router-link>
				</div>
			</div>

			<div v-else class="mt-4 bg-gray-50 p-4 rounded-lg">
				<h3 class="text-lg text-gray-900 font-bold">Команды: 0</h3>

				<div class="mt-4 text-gray-500">
					<p class="mt-2">Тут пока нет команд</p>
				</div>
			</div>
		</div>

		<div v-else class="w-full py-10 flex justify-center items-center">
			<UiLoader />
		</div>
	</div>
</template>

<script lang="ts">
import TeamCard from '@/components/teams/TeamCard.vue'
import UiActionBlock from '@/components/ui/UiActionBlock.vue'
import UiLoader from '@/components/ui/UiLoader.vue'
import { EventsService } from '@/services/events'
import { TeamsService } from '@/services/teams'
import { Team } from '@/types'
import { INotificationPlugin } from '@/utils/plugins/toast'
import { computed, defineComponent, inject, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
	name: 'EventDetails',
	components: { UiLoader, TeamCard, UiActionBlock },
	setup() {
		const route = useRoute()
		const router = useRouter()

		const eventId = route.params.id as string
		const event = computed(() => EventsService.state.event)
		const eventTeams = ref<Team[] | []>([])
		const isOwner = ref(false)
		const isLoading = ref(false)

		const notification = inject('$notification') as INotificationPlugin

		const deleteEvent = async () => {
			try {
				await EventsService.deleteEventById(+eventId)
				notification.success('Событие успешно удалено')
				router.push('/events')
			} catch (e) {
				notification.error('Ошибка при удалении события')
			}
		}

		onMounted(async () => {
			try {
				isLoading.value = true
				await EventsService.fetchEventById(+eventId)
				eventTeams.value = await TeamsService.fetchTeams(eventId)
				isOwner.value = await EventsService.isOwner(+eventId)
			} catch (e) {
				notification.error('Ошибка при загрузке события')
			} finally {
				isLoading.value = false
			}
		})

		return {
			event,
			eventTeams,
			eventId,
			isOwner,
			deleteEvent,
			isLoading
		}
	}
})
</script>
