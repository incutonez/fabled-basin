<script setup lang="ts">
import { FieldComboBox } from "@incutonez/core-ui";
import { WorldColors } from "@/enums/WorldColors";
</script>

<template>
	<FieldComboBox
		:options="WorldColors"
		option-label="displayName"
		label-cls="w-20"
	/>
</template>
