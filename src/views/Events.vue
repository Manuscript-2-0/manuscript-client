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
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { EventsService } from '@/services/events'
import UiActionBlock from '@/components/ui/UiActionBlock.vue'

export default defineComponent({
	name: 'Events',
	components: { UiActionBlock },
	setup() {
		const events = computed(() => EventsService.state.events)
		const fetchEvents = async () => {
			await EventsService.fetchEvents()
		}
		onMounted(async () => {
			await fetchEvents()
		})
		return {
			events
		}
	}
})
</script>
