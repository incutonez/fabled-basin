<script setup lang="ts">
import { computed, reactive, ref, unref, watch } from "vue";
import { BaseButton, BaseTabs, FieldCheckbox, FieldComboBox, FieldDisplay, FieldLabel, FieldNumber } from "@incutonez/core-ui";
import { IconAdd, IconDelete, IconSave, IconUploadFile } from "@incutonez/core-ui/assets";
import { makeArray, removeItem } from "@incutonez/core-ui/utils";
import { findRecord } from "@/enums/helper";
import { Items } from "@/enums/Items";
import { Enemies } from "@/enums/NPCs";
import { ScreenTemplates } from "@/enums/ScreenTemplates";
import { Tiles } from "@/enums/Tiles";
import { WorldColors, WorldColorsNone } from "@/enums/WorldColors";
import { GameScreen } from "@/models/GameScreen";
import { GameTileCell } from "@/models/GameTileCell";
import { GameWorld } from "@/models/GameWorld";
import { Parent } from "@/models/ViewModel";
import { provideCellCopy } from "@/views/gameWorldBuilder/cellCopy";
import FieldWorldColors from "@/views/gameWorldBuilder/FieldWorldColors.vue";
import { provideWorldConfig } from "@/views/gameWorldBuilder/providers";
import ScreenConfigPanel from "@/views/gameWorldBuilder/ScreenConfigPanel.vue";
import TileGrid from "@/views/gameWorldBuilder/TileGrid.vue";
import WorldConfigPanel from "@/views/gameWorldBuilder/WorldConfigPanel.vue";

/**
 * TODOJEF:
 * - I think I need to rework the JSON output... it should output the entire world in a single JSON, and load it that way...
 * -- This is because I think it'll eventually get shoved into a DB
 * - Add special properties for Transitions
 * - Should rename Door to ShopDoor, as it's a little special
 * - Optimize the export... right now, it does all individual cells... should be able to group by type
 * - Load into Unity game to see it working
 * - Finish other TODOJEFs
 * - Add special properties to Tiles... will need to wire this up in Unity code
 * -- Like CanBreak, CanBurn, CanBomb
 */
const fileInputEl = ref<HTMLInputElement>();
const selectedCell = ref<GameTileCell>();
const { worldRecord: selectedWorld, screenRecord: selectedScreen } = provideWorldConfig();
const showGridLines = ref(true);
const worlds = reactive<GameWorld[]>([]);
const isTransition = computed(() => selectedCell.value?.tile.isTransition);
const selectedTile = computed(() => selectedCell.value?.tile);
const selectedItem = computed(() => selectedCell.value?.item);
const selectedEnemy = computed(() => selectedCell.value?.enemy);
const showColors = computed(() => !isTransition.value && selectedTile.value?.hasImage());
const tabs = ref(["World"]);
const selectedTab = ref(tabs.value[0]);
const gridCls = computed(() => {
	return {
		"grid-origin-top-left": selectedScreen.value?.OriginTopLeft,
		"grid-show-lines": showGridLines.value,
	};
});

function getCellColor() {
	const found = findRecord(WorldColors, selectedScreen.value?.GroundColor);
	if (found === WorldColorsNone || !found) {
		return "";
	}
	return `background-color: #${found.id};`;
}

function onUpdateTileColor() {
	selectedTile.value?.updateImage();
}

function onUpdateEnemyColor() {
	selectedEnemy.value?.updateImage();
}

function onReplaceCell({ indices, replacement }: { indices: number | number[], replacement: GameTileCell }) {
	indices = makeArray(indices);
	// Make sure we update the selection with the replacement
	selectedCell.value = replacement;
	const $selectedScreen = unref(selectedScreen);
	if ($selectedScreen) {
		indices.forEach((idx) => {
			const record = $selectedScreen.cells[idx];
			const clone = replacement.clone({
				options: {
					init: true,
				},
			});
			clone.Coordinates = record.Coordinates;
			// Replace the parent, as it gets cloned incorrectly
			clone[Parent] = $selectedScreen!;
			$selectedScreen.cells[idx] = clone;
		});
	}
}

function onClickLoadBtn() {
	fileInputEl.value?.click();
}

function onClickAddWorld() {
	selectedWorld.value = GameWorld.create({
		Name: "Temporary Name",
	}, {
		[Parent]: worlds,
	});
	worlds.push(selectedWorld.value);
}

function onClickDeleteWorld() {
	removeItem(worlds, selectedWorld.value);
	selectedWorld.value = undefined;
}

function onChangeLoadFile() {
	const reader = new FileReader();
	reader.addEventListener("load", () => {
		selectedScreen.value?.loadFileData(JSON.parse(reader.result as string));
	});
	const [file] = fileInputEl.value?.files ?? [];
	if (file) {
		reader.readAsText(file);
	}
}

function onClickSaveBtn() {
	// TODO: Move this logic to a utility function
	const contents = new Blob([JSON.stringify(worlds.map((world) => world.getConfig()))], {
		type: "application/json",
	});
	const tempEl = document.createElement("a");
	tempEl.download = "game.json";
	tempEl.href = window.URL.createObjectURL(contents);
	tempEl.click();
}

function onClickAddScreen() {
	selectedScreen.value = GameScreen.create({
		totalRows: 11,
		totalColumns: 16,
		Name: "Screen Name",
	}, {
		init: true,
	});
	selectedWorld.value!.Children.push(selectedScreen.value);
}

function onClickDeleteScreen() {
	removeItem(selectedWorld.value!.Children, selectedScreen.value);
	selectedScreen.value = undefined;
}

watch(selectedWorld, () => {
	selectedCell.value = undefined;
	selectedScreen.value = undefined;
});

watch(selectedScreen, ($selectedScreen, $previousValue) => {
	selectedCell.value = undefined;
	if ($selectedScreen && !$previousValue) {
		tabs.value.push("Screen");
		selectedTab.value = "Screen";
	}
	else if (!$selectedScreen) {
		removeItem(tabs.value, "Screen");
		selectedTab.value = "World";
	}
});

watch(() => selectedScreen.value?.OriginTopLeft, ($originTopLeft) => {
	const cells = selectedScreen.value?.cells;
	if ($originTopLeft && cells?.[0].Coordinates[1] !== 0 || !$originTopLeft && cells?.[0].Coordinates[1] !== 10) {
		selectedScreen.value?.cells.forEach((cell) => cell.Coordinates = [cell.x, 10 - cell.y]);
	}
});

watch(selectedCell, ($selectedCell, $previousValue) => {
	const $tabs = unref(tabs);
	if ($selectedCell && !$previousValue) {
		$tabs.push("Tile", "Item", "Enemy");
		selectedTab.value = "Tile";
	}
	else if (!$selectedCell) {
		removeItem($tabs, "Tile");
		removeItem($tabs, "Item");
		removeItem($tabs, "Enemy");
		if (selectedTab.value !== "World") {
			selectedTab.value = "Screen";
		}
	}
});

provideCellCopy();
</script>

<template>
	<article class="flex h-full space-x-4 p-4">
		<TileGrid
			v-model:selected-cell="selectedCell"
			:cells="selectedScreen?.cells"
			:total-columns="selectedScreen?.totalColumns ?? 11"
			:total-rows="selectedScreen?.totalRows ?? 16"
			:style="getCellColor()"
			:class="gridCls"
			@replace-cell="onReplaceCell"
		/>
		<section class="flex min-w-80 flex-col space-y-4">
			<article class="flex flex-col space-y-4">
				<section class="flex w-full space-x-2 bg-white py-2">
					<BaseButton
						text="Save"
						:icon="IconSave"
						@click="onClickSaveBtn"
					/>
					<BaseButton
						text="Load"
						:icon="IconUploadFile"
						@click="onClickLoadBtn"
					/>
					<FieldCheckbox
						v-model="showGridLines"
						label="Grid Lines"
					/>
					<input
						v-show="false"
						ref="fileInputEl"
						type="file"
						@change="onChangeLoadFile"
					>
				</section>
				<section class="flex space-x-2">
					<FieldComboBox
						v-model="selectedWorld"
						:options="worlds"
						:value-only="false"
						label-align="top"
						label="World"
						option-label="Name"
						option-value="Name"
						class="flex-1"
					/>
					<BaseButton
						:icon="IconAdd"
						title="Add World"
						@click="onClickAddWorld"
					/>
					<BaseButton
						v-show="!!selectedWorld"
						:icon="IconDelete"
						title="Delete World"
						@click="onClickDeleteWorld"
					/>
				</section>
				<section
					v-if="!!selectedWorld?.Name"
					class="flex space-x-2"
				>
					<FieldComboBox
						v-model="selectedScreen"
						:options="selectedWorld.Children"
						:value-only="false"
						label-align="top"
						label="Screen"
						option-label="Name"
						option-value="Name"
						class="flex-1"
					/>
					<BaseButton
						:icon="IconAdd"
						title="Add Screen"
						@click="onClickAddScreen"
					/>
					<BaseButton
						v-show="!!selectedScreen"
						:icon="IconDelete"
						title="Delete Screen"
						@click="onClickDeleteScreen"
					/>
				</section>
			</article>
			<BaseTabs
				v-if="!!selectedWorld"
				v-model:selected="selectedTab"
				:tabs="tabs"
				class="grow"
			>
				<template #content>
					<WorldConfigPanel v-show="selectedTab === 'World'" />
					<ScreenConfigPanel v-show="selectedTab === 'Screen'" />
					<template v-if="selectedTab === 'Tile'">
						<article class="flex h-full flex-col overflow-auto">
							<section class="w-72 flex-1 space-y-2">
								<template v-if="selectedTile">
									<div class="flex justify-between">
										<FieldComboBox
											v-model="selectedTile.Type"
											:options="Tiles"
											:value-only="false"
											option-label="displayName"
											label-position="top"
											label="Type"
											class="mr-2 flex-1"
										/>
										<div
											v-show="showColors"
											class="size-16 bg-blue-100"
										>
											<img
												v-if="selectedTile.src"
												:src="selectedTile.src"
												class="size-full"
												alt="Tile Image"
											>
										</div>
									</div>
									<template v-if="showColors">
										<hr>
										<FieldLabel
											text="Replace Tile Colors"
											position="top"
											size="medium"
											class="!text-black"
											separator=""
										/>
										<FieldWorldColors
											v-for="tileColor in selectedTile.Colors"
											:key="tileColor.Target.id"
											v-model="tileColor.Value"
											:label="tileColor.Target.displayName"
											:value-only="false"
											@update:model-value="onUpdateTileColor"
										/>
									</template>
									<template v-if="isTransition && selectedTile.Transition">
										<FieldNumber
											v-model="selectedTile.Transition.X"
											label="Transition X"
											width="w-24"
										/>
										<FieldNumber
											v-model="selectedTile.Transition.Y"
											label="Transition Y"
											width="w-24"
										/>
										<FieldNumber
											v-model="selectedTile.OffsetX"
											label="Position Offset X"
											width="w-24"
										/>
										<FieldNumber
											v-model="selectedTile.OffsetY"
											label="Position Offset Y"
											width="w-24"
										/>
										<FieldDisplay
											v-if="selectedTile.isDoor"
											:value="selectedTile.Transition.Name"
											label="Name"
										/>
										<FieldComboBox
											v-if="selectedTile.isDoor"
											v-model="selectedTile.Transition.Template"
											label="Template"
											required
											option-value="value"
											:options="ScreenTemplates"
										/>
										<FieldCheckbox
											v-model="selectedTile.Transition.IsFloating"
											label="Floating"
										/>
									</template>
								</template>
							</section>
						</article>
					</template>
					<template v-else-if="selectedTab === 'Item'">
						<div
							v-if="selectedItem"
							class="flex justify-between"
						>
							<FieldComboBox
								v-model="selectedItem.Type"
								:options="Items"
								:value-only="false"
								label="Item Type"
								label-position="top"
								class="mr-2 flex-1"
							/>
							<div class="flex size-16 justify-center bg-blue-100">
								<img
									v-if="selectedItem.src"
									:src="selectedItem.src"
									class="h-full"
									alt="Item Image"
								>
							</div>
						</div>
					</template>
					<template v-else-if="selectedTab === 'Enemy' && selectedEnemy">
						<div class="flex items-center justify-between">
							<div class="mr-2 flex flex-1 flex-col justify-between space-y-2">
								<FieldComboBox
									v-model="selectedEnemy.Type"
									:options="Enemies"
									:value-only="false"
									label="Type"
									label-cls="w-12"
								/>
								<FieldNumber
									v-model="selectedEnemy.Speed"
									label="Speed"
									label-cls="w-12"
								/>
							</div>
							<div class="flex size-16 justify-center bg-blue-100">
								<img
									v-if="selectedEnemy.src"
									:src="selectedEnemy.src"
									class="h-full"
									alt="Item Image"
								>
							</div>
						</div>
						<template v-if="selectedEnemy.hasImage()">
							<hr>
							<FieldLabel
								text="Replace Colors"
								position="top"
								class="uppercase"
								size="medium"
								separator=""
							/>
							<FieldWorldColors
								v-for="tileColor in selectedEnemy.Colors"
								:key="tileColor.Target.id"
								v-model="tileColor.Value"
								:value-only="false"
								:label="tileColor.Target.displayName"
								@update:model-value="onUpdateEnemyColor"
							/>
						</template>
						<hr>
						<FieldLabel
							text="Health"
							position="top"
							class="uppercase"
							size="medium"
							separator=""
						/>
						<FieldNumber
							v-model="selectedEnemy.Health"
							label="Value"
							label-cls="w-16"
						/>
						<FieldNumber
							v-model="selectedEnemy.HealthModifier"
							label="Modifier"
							label-cls="w-16"
						/>
						<hr>
						<FieldLabel
							text="Damage"
							position="top"
							class="uppercase"
							size="medium"
							separator=""
						/>
						<FieldNumber
							v-model="selectedEnemy.TouchDamage"
							label="Touch"
							label-cls="w-14"
						/>
						<FieldNumber
							v-model="selectedEnemy.WeaponDamage"
							label="Weapon"
							label-cls="w-14"
						/>
					</template>
				</template>
			</BaseTabs>
		</section>
	</article>
</template>
