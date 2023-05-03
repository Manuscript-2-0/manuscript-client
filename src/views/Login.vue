<template>
	<div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-lg">
			<h1 class="text-center text-2xl font-bold text-blue-600 sm:text-3xl">
				Вход в систему
			</h1>

			<p class="mx-auto max-w-md text-center text-gray-500 mt-4">
				Если у вас уже есть аккаунт, то вы можете войти в систему
			</p>

			<form
				class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
				@submit.prevent="onSubmit"
			>
				<div>
					<UiInput
						v-model="email"
						title="Email"
						placeholder="Введите email"
						type="email"
						required
					/>
				</div>

				<div>
					<UiInput
						v-model="password"
						title="Пароль"
						placeholder="Введите пароль"
						type="password"
						required
					/>
				</div>

				<button
					type="submit"
					class="block w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white"
				>
					Войти
				</button>

				<p class="text-center text-sm text-gray-500">
					Нет аккаунта?
					<button class="underline" @click="$router.push('/register')">
						Зарегистрироваться
					</button>
				</p>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import UiInput from '@/components/ui/UiInput.vue'
import { AuthService } from '@/services/auth'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'AuthPage',
	components: { UiInput },
	setup() {
		const router = useRouter()

		const email = ref('')
		const password = ref('')

		const onSubmit = async () => {
			try {
				await AuthService.loginUser(email.value, password.value)

				router.push({ name: 'Events' })
			} catch (e) {
				console.log(e)
			}
		}

		onMounted(() => {
			if (AuthService.isAuthorized()) {
				router.push({ name: 'Events' })
			}
		})

		return {
			email,
			password,
			onSubmit
		}
	}
})
</script>
