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

		<section
			class="flex flex-col mt-4 rounded-xl bg-gray-100 p-4 sm:p-6 lg:p-8"
		>
			<h1 class="text-2xl font-semibold text-gray-800 mb-4">
				Уведомления ({{ notifications.length }})
			</h1>

			<template
				v-if="notifications.length"
				v-for="notification in notifications"
				:key="notification.id"
			>
				<div class="flex items-center justify-between p-4 bg-gray-100">
					<div class="flex items-center">
						<div class="text-gray-500 flex flex-col">
							<div>{{ notification.created_at }}</div>
						</div>
						<div
							class="ml-4 text-gray-800 font-medium leading-tight whitespace-nowrap"
						>
							{{ notification.message }}
						</div>
					</div>

					<!-- status -->
					<div
						class="text-gray-800 font-medium leading-tight whitespace-nowrap"
						:class="{
							'text-red-500 font-bold':
								notification.status === ENotificationStatus.DANGER_TYPE,
							'text-yellow-500 font-bold':
								notification.status === ENotificationStatus.WARNING_TYPE,
							'text-green-500 font-bold':
								notification.status === ENotificationStatus.SUCCESS_TYPE
						}"
					>
						{{ formattedStatusText(notification.status) }}
					</div>
				</div>
			</template>
			<template v-else>
				<div class="text-gray-500 text-center py-10">
					У вас пока нет уведомлений
				</div>
			</template>
		</section>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import UiActionBlock from '@/components/ui/UiActionBlock.vue'
import { NotificationsService } from '@/services/notifications'
import { ENotificationStatus } from '@/types'

export default defineComponent({
	name: 'Notifications',
	components: { UiActionBlock },
	setup() {
		const notifications = computed(
			() => NotificationsService.state.notifications
		)

		const formattedStatusText = (status: ENotificationStatus) => {
			switch (status) {
				case ENotificationStatus.DANGER_TYPE:
					return 'Очень важно'
				case ENotificationStatus.WARNING_TYPE:
					return 'Важно'
				case ENotificationStatus.SUCCESS_TYPE:
					return 'Успешно'
				default:
					return 'Неизвестно'
			}
		}

		onMounted(async () => {
			await NotificationsService.fetchNotifications()
		})

		return {
			notifications,
			ENotificationStatus,
			formattedStatusText
		}
	}
})
</script>
