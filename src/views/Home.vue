<template>
	<div class="px-10">
		<section class="welcome bg-gray-100 h-96 rounded-lg flex p-4">
			<div class="flex justify-center items-center w-full">
				<img
					src="@/assets/icons/calendar.png"
					alt="Иконка календаря"
					class="object-contain h-full w-full"
				/>
			</div>

			<div class="flex flex-col justify-center px-10">
				<h1 class="text-3xl font-bold text-gray-800">
					Добро пожаловать на Manuscript🫶🏼
				</h1>
				<p class="text-gray-600 text-xl mt-4">
					Manuscript- сервис для студентов по поиску команд, проектов и
					сотрудников. На платформе каждый студент заявляет о проекте над
					которым работает, либо присоединяется к уже заявленным и таким образом
					увеличивает “арсенал” возможностей команды
				</p>

				<div class="mt-10">
					<button
						class="bg-black text-white text-lg font-medium py-2 px-4 rounded-lg"
						@click="$router.push('/events')"
					>
						Начать
					</button>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Home'
})
</script>
