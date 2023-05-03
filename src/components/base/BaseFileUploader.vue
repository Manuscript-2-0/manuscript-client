<template>
	<h1 class="text-xl font-bold text-gray-800">Выбор изображения</h1>
	<div class="uploader flex items-center">
		<div v-if="image" class="w-32 h-32 rounded-lg bg-gray-100 p-4">
			<img :src="image" alt="preview" class="object-contain" />
		</div>

		<div class="flex flex-col mt-4">
			<button
				type="button"
				class="uploader__button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-center cursor-pointer"
				@click="triggerInput"
			>
				Выбрать файл
			</button>

			<button
				v-if="image"
				type="button"
				class="uploader__button bg-red-500 mt-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full text-center cursor-pointer"
				@click="image = ''"
			>
				Очистить
			</button>
		</div>

		<input
			ref="input"
			type="file"
			class="hidden"
			accept="image/*"
			id="image"
			name="image"
			@change="onImageChange"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'BaseFileUploader',
	emits: ['select'],
	setup(_props, { emit }) {
		const image = ref('')
		const input = ref<HTMLInputElement | null>(null)

		const onImageChange = (e: Event) => {
			const target = e.target as HTMLInputElement
			const file = target.files?.[0]

			if (file) {
				image.value = URL.createObjectURL(file)
			}

			emit('select', file)
		}

		const triggerInput = () => {
			input.value?.click()
		}

		return {
			image,
			input,
			triggerInput,
			onImageChange
		}
	}
})
</script>
