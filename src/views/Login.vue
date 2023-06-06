<template>
	<div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-lg">
			<h1 class="text-center text-2xl font-bold sm:text-3xl">Вход в систему</h1>

			<p class="mx-auto max-w-md text-center text-gray-500 mt-4">
				Если у вас уже есть аккаунт, то вы можете войти в систему
			</p>

			<form
				class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
				novalidate
			>
				<div>
					<UiInput
						v-model="email"
						title="Email"
						placeholder="Введите email"
						required
						:has-error="!isEmailValid && isFormSubmitted"
					>
						<template v-if="!isEmailValid" #error>
							<div>Неверный формат email</div>
						</template>
					</UiInput>
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
					class="block w-full rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
					@click.prevent="onSubmit"
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
import { defineComponent, inject, onMounted, ref, computed } from 'vue'
import UiInput from '@/components/ui/UiInput.vue'
import { AuthService } from '@/services/auth'
import { useRouter } from 'vue-router'
import { INotificationPlugin } from '@/utils/plugins/toast'
import { useFormValidator } from '@/utils/composables'

export default defineComponent({
	name: 'AuthPage',
	components: { UiInput },
	setup() {
		const router = useRouter()
		const { isEmailValid } = useFormValidator()

		const toast = inject('$notification') as INotificationPlugin

		const email = ref('')
		const password = ref('')

		const isFormSubmitted = ref(false)

		const onSubmit = async () => {
			if (!isEmailValid(email.value) || !password.value.length) {
				isFormSubmitted.value = true
				return
			}

			try {
				await AuthService.loginUser(email.value, password.value)

				toast.success('Вы успешно вошли в систему')

				router.push({ name: 'Events' })
			} catch (e) {
				toast.error('Неверный логин или пароль')
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
			isFormSubmitted,
			isEmailValid: computed(() => isEmailValid(email.value)),
			onSubmit
		}
	}
})
</script>
