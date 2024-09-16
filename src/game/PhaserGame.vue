<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import Phaser from "phaser";
import { version } from "@/../package.json";
import { EventBus } from "./EventBus";
import { startGame } from "./main";

// Save the current scene instance
const scene = ref();
const game = ref();

const emit = defineEmits(["current-active-scene"]);

onMounted(() => {
	game.value = startGame();
	EventBus.on("current-scene-ready", (scene_instance: Phaser.Scene) => {
		emit("current-active-scene", scene_instance);
		scene.value = scene_instance;
	});
});

onUnmounted(() => {
	if (game.value) {
		game.value.destroy(true);
		game.value = null;
	}
});

defineExpose({
	scene,
	game,
});

</script>

<template>
	<article class="flex size-full">
		<section class="flex-1 bg-black" />
		<section
			id="game-container"
		/>
		<section class="flex flex-1 items-end bg-black font-semibold text-white">
			<div class="flex w-full place-content-end p-2">
				<span>Version: {{ version }}</span>
			</div>
		</section>
	</article>
</template>
