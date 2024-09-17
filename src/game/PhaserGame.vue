<script setup lang="ts">
import { onMounted, onUnmounted, ref, unref, watch } from "vue";
import Phaser from "phaser";
import { version } from "@/../package.json";
import { EventBus } from "./EventBus";
import { ZeldaGame } from "./main";

// Save the current scene instance
const scene = ref();
const game = ref<ZeldaGame>();
const debug = ref(true);

const emit = defineEmits(["current-active-scene"]);

watch(debug, ($debug) => {
	const $game = unref(game);
	if ($game) {
		$game.scene.scenes.forEach((scene) => {
			if (scene.matter.world) {
				scene.matter.world.drawDebug = $debug;
				scene.matter.world.debugGraphic.clear();
			}
		});
	}
});

onMounted(() => {
	game.value = new ZeldaGame();
	EventBus.on("current-scene-ready", (scene_instance: Phaser.Scene) => {
		emit("current-active-scene", scene_instance);
		scene.value = scene_instance;
	});
});

onUnmounted(() => {
	game.value?.destroy(true);
	game.value = undefined;
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
		<section class="flex flex-1 flex-col bg-black font-semibold text-white">
			<label class="flex items-center p-2">
				<span>Debug</span>
				<input
					v-model="debug"
					type="checkbox"
					class="ml-2 size-4"
				>
			</label>
			<div class="mt-auto flex w-full place-content-end p-2">
				<span>Version: {{ version }}</span>
			</div>
		</section>
	</article>
</template>
