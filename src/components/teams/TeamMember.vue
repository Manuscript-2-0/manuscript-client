<template>
	<div class="flex items-center p-2 bg-gray-100 rounded-lg mt-2 w-full">
		<div class="flex items-center space-x-4">
			<img
				:src="`https://ui-avatars.com/api/?name=${member.user.first_name}+${member.user.last_name}`"
				:alt="member.user.first_name"
				class="w-16 h-16 rounded-full"
			/>
			<div class="flex flex-col">
				<h4 class="text-lg text-gray-900 font-bold">
					{{ member.user.first_name }} {{ member.user.last_name }}
				</h4>
				<p class="text-gray-600 text-sm">{{ memberRole }}</p>
			</div>
		</div>

		<div class="flex items-center ml-auto">
			<button
				v-if="isDeletable && !isRequests"
				class="bg-red-700 hover:bg-black text-white font-bold py-2 px-4 rounded"
				@click="$emit('delete-member', member.user.id)"
			>
				Удалить
			</button>

			<template v-if="isRequests">
				<button
					class="bg-green-700 hover:bg-black text-white font-bold py-2 px-4 rounded"
					@click="$emit('accept-member', member.user.id)"
				>
					Принять
				</button>

				<button
					class="bg-red-700 hover:bg-black text-white font-bold py-2 px-4 rounded ml-2"
					@click="$emit('decline-member', member.user.id)"
				>
					Отклонить
				</button>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IMember } from '@/types/teams'

export default defineComponent({
	name: 'TeamMember',
	props: {
		member: {
			type: Object as PropType<IMember>,
			required: true
		},
		isDeletable: {
			type: Boolean,
			required: false
		},
		isRequests: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	emits: ['delete-member', 'accept-member', 'decline-member'],
	setup(props) {
		const memberRole = props.member.role === 'LEADER' ? 'Лидер' : 'Участник'

		return {
			memberRole
		}
	}
})
</script>
