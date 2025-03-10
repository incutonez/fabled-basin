<script setup lang="ts">
import { FieldCheckbox, FieldNumber, FieldText } from "@incutonez/core-ui";
import { IsNew } from "@/models/ViewModel";
import FieldWorldColors from "@/views/gameWorldBuilder/FieldWorldColors.vue";
import { injectWorldConfig } from "@/views/gameWorldBuilder/providers";

const { screenRecord } = injectWorldConfig();

function onBlurName() {
	screenRecord.value![IsNew] = false;
}
</script>

<template>
	<article v-if="screenRecord">
		<FieldText
			v-model="screenRecord.Name"
			label="Name"
			class="mb-2"
			:auto-select="screenRecord[IsNew]"
			@blur="onBlurName"
		/>
		<section class="flex space-x-2">
			<section class="flex flex-1 flex-col space-y-2">
				<FieldNumber
					v-model="screenRecord.X"
					label="World X"
					label-width="auto"
					input-width="w-8"
					width="max-w-28"
				/>
				<FieldNumber
					v-model="screenRecord.CellSize"
					label="Cell Size"
				/>
				<FieldWorldColors
					v-model="screenRecord.AccentColor"
					label="Accent"
					label-cls="w-12"
					width="w-28"
				/>
			</section>
			<section class="flex flex-1 flex-col space-y-2">
				<FieldNumber
					v-model="screenRecord.Y"
					label="World Y"
					label-width="auto"
					input-width="w-8"
					width="max-w-28"
				/>
				<FieldCheckbox
					v-model="screenRecord.OriginTopLeft"
					label="Origin Top Left"
				/>
				<FieldWorldColors
					v-model="screenRecord.GroundColor"
					label="Ground"
					label-cls="w-12"
					width="w-28"
				/>
			</section>
		</section>
	</article>
</template>
