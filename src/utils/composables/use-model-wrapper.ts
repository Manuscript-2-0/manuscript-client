import { computed } from 'vue'

export default function useModelValue(
	props: {
		[key: string]: unknown
	},
	emit: (event: 'update:modelValue', ...args: unknown[]) => void
) {
	return computed({
		get: () => props.modelValue,
		set: value => emit('update:modelValue', value)
	})
}
