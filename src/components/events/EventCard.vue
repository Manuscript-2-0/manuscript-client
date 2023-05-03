<template>
	<article
		class="overflow-hidden rounded-lg shadow transition hover:shadow-lg cursor-pointer p-4"
	>
		<img
			alt="Office"
			src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
			class="h-56 w-full object-cover"
		/>

		<div class="bg-white py-4 sm:py-6">
			<time datetime="2022-10-10" class="block text-xs text-gray-500">
				{{ event.start_date }}
			</time>

			<h3 class="mt-0.5 text-lg text-gray-900">
				{{ event.name }}
			</h3>

			<p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
				{{ event.description }}
			</p>

			<div v-if="event.author">
				<span class="mt-2 text-sm/relaxed text-gray-500">Автор:</span>
				<span class="mt-2 text-sm/relaxed text-gray-500 ml-1"
					>{{ event.author.first_name }} {{ event.author.last_name }}</span
				>
			</div>
		</div>

		<template v-if="event.tags.length">
			{{ event.tags }}
			<Tag
				v-for="tag in event.tags"
				:key="tag"
				class="ml-2 first:ml-0"
				severity="info"
				:value="tag"
			/>
		</template>
	</article>
</template>

<script lang="ts">
import { IEvent } from '@/types'
import { defineComponent, PropType } from 'vue'
import Tag from 'primevue/tag'

export default defineComponent({
	name: 'EventCard',
	components: { Tag },
	props: {
		event: {
			type: Object as PropType<IEvent>,
			required: true
		}
	}
})
</script>
