<template>
	<article
		class="overflow-hidden rounded-lg shadow transition hover:shadow-lg cursor-pointer p-4 bg-white"
	>
		<img
			alt="Office"
			src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
			class="h-56 w-full object-cover"
		/>

		<div class="mt-2">
			<h3 class="mt-0.5 text-lg text-gray-900">
				{{ team.name }}
			</h3>

			<div v-if="leader" class="bg-gray-100 p-2 rounded-lg mt-2">
				<span class="mt-2 text-sm/relaxed text-gray-500">Лидер:</span>
				<span class="mt-2 text-sm/relaxed text-gray-500 ml-1"
					>{{ leader.first_name }} {{ leader.last_name }}</span
				>
			</div>

			<div class="mt-4 text-center text-gray-500">Посмотреть команду</div>
		</div>
	</article>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { TeamsService } from '@/services/teams'
import { Team } from '@/types'

export default defineComponent({
	name: 'TeamCard',
	props: {
		team: {
			type: Object as PropType<Team>,
			required: true
		}
	},
	setup(props) {
		const leader = computed(() => {
			return TeamsService.getTeamLeader(props.team)
		})

		return {
			leader
		}
	}
})
</script>
