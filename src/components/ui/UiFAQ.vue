<template>
	<div class="flex flex-col items-center justify-center w-full space-y-4">
		<div
			class="flex flex-col items-center justify-between w-full space-y-4 md:space-y-0 md:space-x-4 md:flex-row bg-gray-50 py-3 px-4 rounded-lg cursor-pointer"
			@click="isOpen = !isOpen"
		>
			<div>
				<div class="text-lg font-semibold">{{ faq.question }}</div>
			</div>

			<div class="flex items-center justify-center">
				<svg
					:class="{ 'transform rotate-180': isOpen }"
					class="w-6 h-6 text-gray-500 transition-transform duration-300 ease-in-out"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					></path>
				</svg>
			</div>
		</div>

		<Transition name="slide-fade">
			<div
				v-if="isOpen"
				class="flex flex-col items-center justify-between w-full space-y-2 md:space-y-0 md:space-x-2 md:flex-row bg-gray-100 p-4 rounded-lg backdrop-blur-sm"
			>
				{{ faq.answer }}
			</div>
		</Transition>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { FAQ } from '@/types'

export default defineComponent({
	name: 'UiFAQ',
	props: {
		faq: {
			type: Object as PropType<FAQ>,
			required: true
		}
	},
	setup() {
		const isOpen = ref(false)

		return {
			isOpen
		}
	}
})
</script>
