<template>
	<Component :is="layout" v-if="isReady">
		<RouterView v-slot="{ Component }">
			<Component :is="Component" />
		</RouterView>
	</Component>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue'

export default defineComponent({
	name: 'App',
	setup() {
		const isReady = ref(false)
		const route = useRoute()
		const layout = computed(() => route.meta.layout || DefaultLayout)

		onMounted(() => {
			isReady.value = true
		})

		return {
			isReady,
			layout
		}
	}
})
</script>
