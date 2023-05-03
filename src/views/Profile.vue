<template>
	<section class="px-10">
		<UiActionBlock title="Профиль">
			<template #image>
				<img
					src="@/assets/icons/profile.png"
					alt=""
					class="object-contain w-32 h-32"
				/>
			</template>

			<template #action>
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					@click="copyInviteLink"
				>
					Пригласить друга
				</button>
			</template>
		</UiActionBlock>

		<div class="flex items-center mt-4">
			<!-- Карта пользователя -->
			<div
				class="flex items-start justify-between rounded-xl border bg-gray-100 p-4 sm:p-6 lg:p-8"
			>
				<div v-if="profile" class="flex flex-col">
					<div class="flex justify-center">
						<img
							:src="`https://ui-avatars.com/api/?name=${profile.first_name}+${profile.last_name}`"
							class="w-16 h-16 rounded-full mr-4"
						/>
					</div>

					<!-- Информация -->
					<div class="mt-4">
						<div class="text-2xl font-semibold text-gray-800">
							{{ profile.first_name }} {{ profile.last_name }}
						</div>

						<div class="text-gray-500">{{ profile.email }}</div>
						<div class="text-gray-500">{{ profile.phone_number }}</div>
					</div>

					<!-- Кнопка выхода -->
					<div class="flex justify-center mt-8">
						<button
							class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
							@click="logout"
						>
							Выйти
						</button>
					</div>
				</div>

				<!-- Загрузка -->
				<div v-else class="flex items-center justify-center w-full h-full">
					<UiLoader />
				</div>
			</div>
			<div
				v-if="profile?.description"
				class="flex items-start justify-between rounded-xl border bg-gray-100 p-4 sm:p-6 lg:p-8 h-full w-full"
			>
				<div class="text-2xl font-semibold text-gray-800">Про вас</div>

				<div>
					{{ profile?.description }}
				</div>
			</div>
		</div>

		<!-- Список постов пользователя -->
		<div class="w-3/4 h-96"></div>
	</section>
</template>

<script lang="ts">
import UiActionBlock from '@/components/ui/UiActionBlock.vue'
import UiLoader from '@/components/ui/UiLoader.vue'
import { AuthService } from '@/services/auth'
import { UserService } from '@/services/user'
import { computed, defineComponent, onMounted } from 'vue'

export default defineComponent({
	name: 'Profile',
	components: { UiLoader, UiActionBlock },
	setup() {
		const profile = computed(() => UserService.state.profile)

		const fetchProfile = async () => {
			await UserService.fetchProfile()
		}

		const copyInviteLink = async () => {
			const link = await UserService.generateInviteLink()
			navigator.clipboard.writeText(link)
		}

		onMounted(() => {
			fetchProfile()
		})

		return {
			profile,
			copyInviteLink,
			logout: AuthService.logout
		}
	}
})
</script>
