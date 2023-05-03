<template>
	<div class="w-full font-sirius">
		<div
			class="input-field rounded-xl bg-gray-100 relative border border-transparent w-full"
			:class="{
				'border-red-error': hasError,
				'border-blue border': isFocused
			}"
		>
			<label
				v-if="title"
				class="absolute left-3 transition-all duration-300"
				:class="{
					'top-2 text-xs': isFocused || model,
					'top-1/2 transform -translate-y-1/2 text-sm': !isFocused && !model,
					'text-black': disabled,
					'text-gray-600': !disabled
				}"
			>
				{{ title }}
			</label>

			<input
				ref="input"
				v-model.trim="model"
				:type="type"
				class="input w-full h-full bg-transparent focus:outline-none absolute top-0 left-0 px-3"
				:class="{
					'placeholder-transparent': !isFocused,
					'placeholder-gray-900': isFocused,
					'pt-1': title && (isFocused || model),
					'pointer-events-none text-black': disabled,
					'hide-dates': !isFocused && type === 'date' && !model
				}"
				:placeholder="placeholder"
				:tabindex="disabled ? -1 : 0"
				@focus="setIsFocused(true)"
				@blur="setIsFocused(false)"
			/>

			<button
				v-if="model && clearable && !disabled"
				class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-200"
				@click="clearInput"
			>
				<img src="@/assets/icons/cross.svg" alt="" width="24" height="24" />
			</button>
		</div>

		<div v-if="hasError" class="mt-1">
			<p class="text-red-400 text-xs font-medium">
				<slot name="error"> Обязательное поле </slot>
			</p>
		</div>

		<div v-if="$slots.info" class="mt-1">
			<slot name="info"></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useModelWrapper } from '@/utils/composables'

export default defineComponent({
	name: 'UiInput',
	props: {
		title: {
			type: String,
			default: ''
		},
		modelValue: {
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		},
		required: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String,
			default: ''
		},
		focus: {
			type: Boolean,
			default: false
		},
		hasError: {
			type: Boolean,
			default: false
		},
		clearable: {
			type: Boolean,
			default: false
		},
		type: {
			type: String,
			default: 'text'
		}
	},
	setup(props, { emit }) {
		const model = useModelWrapper(props, emit)
		const isFocused = ref(false)
		const input = ref<HTMLInputElement | null>(null)

		const setIsFocused = (value: boolean) => (isFocused.value = value)

		const focusInput = () => {
			setIsFocused(true)
			input.value?.focus()
		}

		const blurInput = () => {
			setIsFocused(false)
			input.value?.blur()
		}

		const clearInput = () => {
			model.value = ''
			focusInput()
		}

		onMounted(() => {
			if (props.focus) {
				focusInput()
			}
		})

		return {
			model,
			input,
			isFocused,
			setIsFocused,
			focusInput,
			blurInput,
			clearInput
		}
	}
})
</script>

<style lang="scss" scoped>
.input-field {
	height: 52px;

	.input {
		padding-top: 1.625rem;
		padding-bottom: 0.5rem;
	}
}

.hide-dates::-webkit-datetime-edit,
.hide-dates::-webkit-calendar-picker-indicator {
	display: none;
}
</style>
