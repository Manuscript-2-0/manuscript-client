<template>
	<section class="px-10">
		<UiActionBlock title="FAQ">
			<template #image>
				<img
					src="@/assets/icons/compass.png"
					alt=""
					class="object-contain w-32 h-32"
				/>
			</template>

			<template #action>
				<button
					class="bg-black text-white font-bold py-3 px-4 rounded-lg"
					@click="openTelegram"
				>
					Поддержка
				</button>
			</template>
		</UiActionBlock>

		<template v-for="item in faqList" :key="item.question">
			<UiFAQ class="mt-2 first:mt-0" :faq="item" />
		</template>
	</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { faqList } from '@/utils/constants'
import UiFAQ from '@/components/ui/UiFAQ.vue'
import UiActionBlock from '@/components/ui/UiActionBlock.vue'

export default defineComponent({
	name: 'FAQ',
	setup() {
		const openTelegram = () => {
			window.open('https://t.me/manuscriphelp', '_blank')
		}

		return {
			faqList,
			openTelegram
		}
	},
	components: { UiFAQ, UiActionBlock }
})
</script>
