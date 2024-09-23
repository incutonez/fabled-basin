<script setup lang="ts">
import { onMounted, onUnmounted, ref, unref, watch } from "vue";
import { BaseButton } from "@incutonez/core-ui/dist/components";
import Phaser from "phaser";
import { version } from "@/../package.json";
import { EventBus } from "./EventBus";
import { LegendOfJef } from "./main";

// TODOJEF: Add ability to edit the built game config in the app, where it reloads the game
// Save the current scene instance
const scene = ref();
const game = ref<LegendOfJef>();
const debug = ref(true);
const fileInputEl = ref<HTMLInputElement>();

const emit = defineEmits(["current-active-scene"]);

function onClickLoadWorld() {
	fileInputEl.value?.click();
}

function onChangeLoadFile() {
	const reader = new FileReader();
	reader.addEventListener("load", () => {
		EventBus.emit("loadWorld", JSON.parse(reader.result as string));
	});
	const [file] = fileInputEl.value?.files ?? [];
	if (file) {
		reader.readAsText(file);
	}
}

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
	game.value = new LegendOfJef();
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
		<section id="game-container" />
		<section class="flex flex-1 flex-col bg-black font-semibold text-white">
			<div class="flex flex-col items-start space-y-2 p-2">
				<a
					href="http://incutonez.github.io/Sandbox/#/game"
					class="text-sky-500 underline"
					target="_blank"
				>World Builder</a>
				<BaseButton
					text="Load World"
					@click="onClickLoadWorld"
				/>
				<input
					v-show="false"
					ref="fileInputEl"
					type="file"
					@change="onChangeLoadFile"
				>
				<label class="flex items-center">
					<span>Debug</span>
					<input
						v-model="debug"
						type="checkbox"
						class="ml-2 size-4"
					>
				</label>
			</div>
			<div class="mt-auto flex w-full place-content-end p-2">
				<span>Version: {{ version }}</span>
			</div>
		</section>
	</article>
</template>
