<script setup lang="ts">
import { FieldCheckbox, FieldComboBox, FieldNumber, FieldText } from "@incutonez/core-ui";
import { IsNew } from "@/models/ViewModel";
import { injectWorldConfig } from "@/views/gameWorldBuilder/providers";

const { worldRecord } = injectWorldConfig();

// Once we navigate away from the name field, let's set IsNew to false, so we don't keep auto selecting this field
function onBlurName() {
	worldRecord.value![IsNew] = false;
}
</script>

<template>
	<article
		v-if="worldRecord"
		class="flex flex-col space-y-2"
	>
		<FieldText
			v-model="worldRecord.Name"
			label="Name"
			:auto-select="worldRecord[IsNew]"
			@blur="onBlurName"
		/>
		<FieldNumber
			v-model="worldRecord.Spawn.SceneX"
			label="Spawn X"
		/>
		<FieldNumber
			v-model="worldRecord.Spawn.SceneY"
			label="Spawn Y"
		/>
		<FieldCheckbox
			v-model="worldRecord.initialWorld"
			label="Initial World"
		/>
		<FieldComboBox
			v-model="worldRecord.Spawn.Name"
			:options="worldRecord.Children"
			option-value="Name"
			option-label="Name"
			label="Spawn Screen"
		/>
	</article>
</template>
