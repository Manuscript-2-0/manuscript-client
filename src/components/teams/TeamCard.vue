<template>
	<article
		class="bg-white rounded-lg shadow-lg flex flex-col justify-center items-center p-4 w-full h-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
	>
		<img
			:src="team.team_name || '@/assets/icons/teams.png'"
			alt="Логотип команды"
			class="object-contain w-32 h-32"
		/>

		<h1 class="text-3xl font-bold ml-4">{{ team.team_name }}</h1>

		<div class="ml-auto">
			<router-link
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				:to="`/teams/${team.id}`"
			>
				Подробнее
			</router-link>
		</div>
	</article>
</template>

<script lang="ts">
import { Team } from '@/types'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
	name: 'TeamCard',
	props: {
		team: {
			type: Object as PropType<Team>,
			required: true
		}
	}
})
</script>
