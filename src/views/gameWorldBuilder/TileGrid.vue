<script setup lang="ts">
import { ref, unref, watch } from "vue";
import { BaseContextMenu, BaseDialog, FieldDisplay } from "@incutonez/core-ui";
import { IMenuItem } from "@incutonez/core-ui/types";
import { GameTileCell } from "@/models/GameTileCell";
import { injectCellCopy } from "@/views/gameWorldBuilder/cellCopy";

defineOptions({
	inheritAttrs: false,
});

interface IProps {
	cells?: GameTileCell[];
	totalRows: number;
	totalColumns: number;
	selectedCell?: GameTileCell;
}

const props = defineProps<IProps>();
const	emit = defineEmits(["update:selectedCell", "replaceCell"]);
const rootEl = ref<HTMLElement>();
const contextMenu = ref<InstanceType<typeof BaseContextMenu>>();
const testDialog = ref(null);
const testValue = ref("Hello");
const pressedKeys = injectCellCopy();
const activeCursor = ref("cursor-pointer");
const lastCopiedCell = ref<GameTileCell>();
const hoverCell = ref<GameTileCell>();
const hoverRow = ref<number>();
const hoverColumn = ref<number>();
const showTestDialog = ref(false);
const contextItems: IMenuItem[] = [{
	text: "Tiles",
	click: onClickTilesMenu,
}];

function getCellCls(cell: GameTileCell) {
	let hoverCls = false;
	const $hoverCell = unref(hoverCell);
	if (props.selectedCell && pressedKeys.shift && $hoverCell) {
		const y = cell.y;
		const x = cell.x;
		let fromX = props.selectedCell.x;
		let fromY = props.selectedCell.y;
		let toX = $hoverCell.x;
		let toY = $hoverCell.y;
		if (fromX > toX) {
			fromX = toX;
			toX = props.selectedCell.x;
		}
		if (fromY > toY) {
			fromY = toY;
			toY = props.selectedCell.y;
		}
		if (x <= toX && y <= toY && x >= fromX && y >= fromY) {
			hoverCls = true;
		}
	}
	return {
		[`grid-cell row-start-${cell.y + 1}`]: true,
		"grid-cell-selected": cell === props.selectedCell,
		"grid-cell-hover": hoverCls,
		[activeCursor.value]: true,
	};
}

function getSelectedCells() {
	const cells = [];
	const totalColumns = props.totalColumns;
	const selectedCell = props.selectedCell;
	const $hoverCell = unref(hoverCell);
	if (selectedCell && $hoverCell) {
		let fromX = selectedCell.x;
		let fromY = selectedCell.y;
		let toX = $hoverCell.x;
		let toY = $hoverCell.y;
		/**
     * We have to look at what quadrant our range is in and re-orient our origin if need be
     */
		if (fromX > toX) {
			fromX = toX;
			toX = selectedCell.x;
		}
		if (fromY > toY) {
			fromY = toY;
			toY = selectedCell.y;
		}
		for (let x = fromX; x <= toX; x++) {
			for (let y = fromY; y <= toY; y++) {
				const index = x + y * totalColumns;
				if (index === selectedCell.getIndex()) {
					continue;
				}
				cells.push(index);
			}
		}
	}
	return cells;
}

/**
 * We use mouseup instead of click because of the ctrl-copy flow... that monitors mousedown and up,
 * so we can't rely on click, as that'll change it back to false before we can look at the value
 */
function onMouseUpCell(_event: MouseEvent, cell: GameTileCell) {
	const { selectedCell } = props;
	if (pressedKeys.ctrl && pressedKeys.mouseDown && selectedCell) {
		emit("replaceCell", {
			indices: cell.getIndex(),
			replacement: selectedCell,
		});
		return;
	}
	if (pressedKeys.shift) {
		const indices = getSelectedCells();
		emit("replaceCell", {
			indices,
			// TODOJEF: More performant to call set instead of cloning all the time?
			replacement: selectedCell,
		});
		const selection = document.getSelection();
		if (selection) {
			selection.removeAllRanges();
		}
		return;
	}
	emit("update:selectedCell", cell === selectedCell ? undefined : cell);
}

function onContextMenuCell(event: MouseEvent) {
	contextMenu.value?.show(event);
}

function hideContextMenu() {
	contextMenu.value?.hide();
}

function onMouseOverCell(cell: GameTileCell) {
	hoverCell.value = cell;
	hoverRow.value = cell.y;
	hoverColumn.value = cell.x;
}

function onClickTilesMenu() {
	showTestDialog.value = true;
	hideContextMenu();
}

watch(() => {
	return pressedKeys.shift || pressedKeys.ctrl;
}, () => {
	if (pressedKeys.shift) {
		activeCursor.value = "cursor-cell";
	}
	else if (pressedKeys.ctrl) {
		activeCursor.value = "cursor-copy";
	}
	else {
		activeCursor.value = "cursor-pointer";
	}
});

watch(() => pressedKeys.copy, (value) => {
	if (value) {
		lastCopiedCell.value = props.selectedCell;
	}
});

watch(() => pressedKeys.paste, (value) => {
	const selectedCell = props.selectedCell;
	const replacement = lastCopiedCell.value;
	if (value && selectedCell && replacement && selectedCell !== replacement) {
		const indices = props.cells?.indexOf(selectedCell);
		emit("replaceCell", {
			indices,
			replacement: replacement,
		});
	}
});
</script>

<template>
	<div
		ref="rootEl"
		class="base-grid"
		v-bind="$attrs"
	>
		<div
			v-for="cell in cells"
			:key="cell.id"
			class="relative"
			:class="getCellCls(cell)"
			@mouseup="onMouseUpCell($event, cell)"
			@contextmenu="onContextMenuCell"
			@mouseover="onMouseOverCell(cell)"
		>
			<div
				v-if="cell.tile.isTransition && !cell.tile.isDoor"
				class="size-full bg-green-700"
			/>
			<img
				v-if="cell.tile.src"
				:src="cell.tile.src"
				class="absolute size-full"
				alt="Tile Image"
			>
			<div
				v-if="cell.item.src"
				class="absolute flex size-full justify-center"
			>
				<img
					:src="cell.item.src"
					class="h-full"
					alt="Item Image"
				>
			</div>
			<div
				v-if="cell.enemy.src"
				class="absolute flex size-full justify-center"
			>
				<img
					:src="cell.enemy.src"
					class="h-full"
					alt="Enemy Image"
				>
			</div>
		</div>
	</div>
	<BaseContextMenu
		ref="contextMenu"
		:items="contextItems"
	/>
	<BaseDialog
		ref="testDialog"
		v-model="showTestDialog"
		title="Hello World"
	>
		<template #body>
			<FieldDisplay
				:value="testValue"
				label="Hello"
			/>
		</template>
	</BaseDialog>
</template>
