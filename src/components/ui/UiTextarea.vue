<template>
	<textarea
		ref="root"
		v-model="model"
		rows="1"
		:placeholder="placeholder"
		class="w-full p-4 font-sirius text-base font-medium placeholder-grey-dark bg-gray-100 rounded-xl focus:outline-none"
		:style="{ height }"
	></textarea>
</template>

<script lang="ts">
import { ref, computed, watch, nextTick, defineComponent } from 'vue'

export default defineComponent({
	name: 'UiTextarea',
	props: {
		initialHeight: {
			type: Number,
			default: 48
		},
		modelValue: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: 'Введите значение'
		}
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const height = ref(`${props.initialHeight}px`)
		const root = ref<HTMLTextAreaElement | null>(null)

		const model = computed({
			get() {
				return props.modelValue
			},
			set(value) {
				emit('update:modelValue', value)
			}
		})

		watch(
			() => model.value,
			() => {
				height.value = 'auto'

				nextTick(() => {
					const scrollHeight = root.value?.scrollHeight ?? 0
					const contentHeight =
						scrollHeight < props.initialHeight
							? props.initialHeight
							: scrollHeight

					height.value = `${contentHeight}px`
				})
			}
		)

		return {
			height,
			root,
			model
		}
	}
})
</script>
