<template>
	<div class="px-10">
		<UiActionBlock title="Команды">
			<template #image>
				<img
					src="@/assets/icons/teams.png"
					alt=""
					class="object-contain w-32 h-32"
				/>
			</template>

			<template #action>
				<router-link
					to="/teams/create"
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Создать команду
				</router-link>
			</template>
		</UiActionBlock>

		<!-- Список команд -->
		<section class="bg-gray-100">
			<div class="flex flex-wrap justify-center">
				<div v-for="team in teams" :key="team.id" class="w-1/4 p-4">
					<TeamCard :team="team" />
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import TeamCard from '@/components/teams/TeamCard.vue'
import UiActionBlock from '@/components/ui/UiActionBlock.vue'
import { TeamsService } from '@/services/teams'

export default defineComponent({
	name: 'Teams',
	components: { TeamCard, UiActionBlock },
	setup() {
		const teams = computed(() => TeamsService.state.teams)
		onMounted(async () => {
			await TeamsService.fetchTeams()
		})
		return {
			teams
		}
	}
})
</script>
