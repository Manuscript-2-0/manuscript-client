<template>
	<article
		class="overflow-hidden rounded-lg shadow transition hover:shadow-lg cursor-pointer p-4 bg-white"
	>
		<div
			class="h-56 w-full rounded-lg bg-gray-100 flex items-center justify-center"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					d="M12 11a5 5 0 0 1 5 5v6h-2v-6a3 3 0 0 0-2.824-2.995L12 13a3 3 0 0 0-2.995 2.824L9 16v6H7v-6a5 5 0 0 1 5-5Zm-6.5 3c.279 0 .55.033.81.094a5.948 5.948 0 0 0-.301 1.575L6 16v.086a1.493 1.493 0 0 0-.356-.08L5.5 16a1.5 1.5 0 0 0-1.493 1.355L4 17.5V22H2v-4.5A3.5 3.5 0 0 1 5.5 14Zm13 0a3.5 3.5 0 0 1 3.5 3.5V22h-2v-4.5a1.5 1.5 0 0 0-1.355-1.493L18.5 16c-.175 0-.343.03-.5.085V16c0-.666-.108-1.306-.308-1.904c.258-.063.53-.096.808-.096Zm-13-6a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5Zm13 0a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5Zm-13 2a.5.5 0 1 0 0 1a.5.5 0 0 0 0-1Zm13 0a.5.5 0 1 0 0 1a.5.5 0 0 0 0-1ZM12 2a4 4 0 1 1 0 8a4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4a2 2 0 0 0 0-4Z"
				/>
			</svg>
		</div>
		<!-- <img
			alt="Office"
			src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
			class="h-56 w-full object-cover"
		/> -->

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
