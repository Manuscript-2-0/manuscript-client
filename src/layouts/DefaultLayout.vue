<template>
	<div class="pb-20">
		<BaseNavigation />
		<slot></slot>
	</div>
</template>

<script lang="ts">
import BaseNavigation from '@/components/base/BaseNavigation/BaseNavigation.vue'

export default {
	name: 'DefaultLayout',
	components: { BaseNavigation }
}
</script>
