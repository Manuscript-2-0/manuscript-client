<template>
	<section class="flex items-center bg-gray-100 h-48 rounded-lg py-4 px-10">
		<slot name="image"></slot>

		<h1 class="text-3xl font-bold ml-4">
			{{ title }}
		</h1>

		<div class="ml-auto">
			<slot name="action"></slot>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'UiActionBlock',
	props: {
		title: {
			type: String,
			required: true
		}
	}
})
</script>
