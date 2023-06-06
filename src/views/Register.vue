<template>
	<div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-lg">
			<h1 class="text-center text-2xl font-bold sm:text-3xl">
				Регистрация в системе
			</h1>

			<p class="mx-auto max-w-md text-center text-gray-500 mt-4">
				Если у вас еще нет аккаунта, то вы можете зарегистрироваться
			</p>

			<form
				class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
				novalidate
			>
				<div>
					<UiInput
						v-model="user.email"
						title="Email"
						placeholder="Введите email"
						:has-error="!isEmailValid && isFormSubmitted"
						required
					>
						<template v-if="!isEmailValid" #error>
							<div>Неверный формат email</div>
						</template>
					</UiInput>
				</div>

				<div>
					<UiInput
						v-model="user.first_name"
						title="Имя"
						placeholder="Введите имя"
						required
					/>
				</div>

				<div>
					<UiInput
						v-model="user.last_name"
						title="Фамилия"
						placeholder="Введите фамилию"
						required
					/>
				</div>

				<div>
					<UiInput
						v-model="user.phone_number"
						title="Номер телефона"
						placeholder="Введите номер телефона"
						:has-error="!isPhoneValid && isFormSubmitted"
					>
						<template v-if="!isPhoneValid" #error>
							<div>Неверный формат номера телефона</div>
						</template>
					</UiInput>
				</div>

				<div>
					<UiInput
						v-model="user.password"
						title="Пароль"
						placeholder="Введите пароль"
						type="password"
						required
					/>
				</div>

				<div>
					<UiInput
						v-model="user.confirm_password"
						title="Подтверждение пароля"
						placeholder="Подтвердите пароль"
						type="password"
						:has-error="!!user.confirm_password.length && !isMatchingPasswords"
						required
					>
						<template v-if="!isMatchingPasswords" #error>
							<div>Пароли не совпадают</div>
						</template>
					</UiInput>
				</div>

				<div>
					<UiTextarea
						v-model="user.description"
						placeholder="Расскажите про себя"
					/>
				</div>

				<button
					class="block w-full rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
					@click.prevent="onSubmit"
				>
					Зарегистрироваться
				</button>

				<p class="text-center text-sm text-gray-500">
					Уже есть аккаунт?
					<button class="underline" @click="$router.push('/login')">
						Войти
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
import { ISignupPayload } from '@/types'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { INotificationPlugin } from '@/utils/plugins/toast'
import { useFormValidator } from '@/utils/composables'

export default defineComponent({
	name: 'AuthPage',
	components: { UiInput, UiTextarea },
	setup() {
		const router = useRouter()
		const { isEmailValid, isMatchingPasswords, isPhoneValid, isPasswordValid } =
			useFormValidator()
		const user = ref<ISignupPayload>({
			email: '',
			first_name: '',
			last_name: '',
			phone_number: '',
			password: '',
			confirm_password: '',
			description: ''
		})

		const toast = inject('$notification') as INotificationPlugin
		const isFormSubmitted = ref(false)

		const isFormValid = () => {
			return (
				isEmailValid(user.value.email) &&
				isPhoneValid(user.value.phone_number) &&
				isPasswordValid(user.value.password) &&
				isMatchingPasswords(user.value.password, user.value.confirm_password)
			)
		}

		const onSubmit = async () => {
			try {
				if (!isFormValid()) {
					isFormSubmitted.value = true

					return
				}
				await AuthService.signupUser(user.value)
				toast.success('Вы успешно зарегистрировались')
				router.push({ name: 'Profile' })
			} catch (error) {
				toast.error('Произошла ошибка')
			}
		}

		onMounted(() => {
			if (AuthService.isAuthorized()) {
				router.push({ name: 'Events' })
			}
		})

		return {
			user,
			onSubmit,
			isFormValid,
			isEmailValid: computed(() => isEmailValid(user.value.email)),
			isPhoneValid: computed(() => isPhoneValid(user.value.phone_number)),
			isPasswordValid: computed(() => isPasswordValid(user.value.password)),
			isMatchingPasswords: computed(() =>
				isMatchingPasswords(user.value.password, user.value.confirm_password)
			),
			isFormSubmitted
		}
	}
})
</script>
