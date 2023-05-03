<template>
	<div class="px-10">
		<UiActionBlock title="Уведомления">
			<template #image>
				<img
					src="@/assets/icons/notifications.png"
					alt=""
					class="object-contain w-32 h-32"
				/>
			</template>
		</UiActionBlock>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import UiActionBlock from '@/components/ui/UiActionBlock.vue'
import { NotificationsService } from '@/services/notifications'

export default defineComponent({
	name: 'Notifications',
	components: { UiActionBlock },
	setup() {
		const notifications = computed(
			() => NotificationsService.state.notifications
		)

		onMounted(async () => {
			await NotificationsService.fetchNotifications()
		})

		return {
			notifications
		}
	}
})
</script>
