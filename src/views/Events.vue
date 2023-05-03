<template>
	<div class="px-10">
		<UiActionBlock title="Ивенты">
			<template #image>
				<img
					src="@/assets/icons/events.png"
					alt=""
					class="object-contain w-32 h-32"
				/>
			</template>

			<template #action>
				<router-link
					to="/events/create"
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Создать мероприятие
				</router-link>
			</template>
		</UiActionBlock>

		<div class="mt-10">
			<div class="text-2xl font-semibold text-gray-800">Все ивенты</div>
			<div
				v-if="events?.length"
				class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
			>
				<template v-if="events.length">
					<EventCard
						v-for="event in events"
						:key="event.id"
						class="mt-4"
						:event="event"
						@click="() => $router.push(`/events/${event.id}`)"
					/>
				</template>

				<template v-else>
					<div class="flex items-center justify-center w-full h-full">
						<UiLoader />
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { EventsService } from '@/services/events'
import UiActionBlock from '@/components/ui/UiActionBlock.vue'
import UiLoader from '@/components/ui/UiLoader.vue'
import EventCard from '@/components/events/EventCard.vue'

export default defineComponent({
	name: 'Events',
	components: { UiActionBlock, UiLoader, EventCard },
	setup() {
		const events = computed(() => EventsService.state.events)

		onMounted(async () => {
			await EventsService.fetchEvents()
		})

		return {
			events
		}
	}
})
</script>
