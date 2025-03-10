import {
	inject,
	onUnmounted, provide,
	reactive,
} from "vue";

const CellCopyKey = Symbol("cellCopy");

export type TCellCopyProvider = ReturnType<typeof provideCellCopy>;

export function provideCellCopy() {
	const pressedKeys = reactive({
		shift: false,
		ctrl: false,
		copy: false,
		paste: false,
		mouseDown: false,
	});

	function onDocumentKeyDown(event: KeyboardEvent) {
		pressedKeys.shift = event.shiftKey;
		pressedKeys.ctrl = event.ctrlKey;
		if (event.shiftKey) {
			/* We need to make sure the text selection doesn't occur, as it causes weird visual issues with cells
			 * when we copy/paste using shift click */
			document.onselectstart = function() {
				return false;
			};
		}
		if (event.ctrlKey && event.code === "KeyC") {
			pressedKeys.copy = false;
			// We have to clear out the previous binding, so let's use a setTimeout to push onto the event loop
			setTimeout(() => {
				pressedKeys.copy = true;
			});
		}
		if (event.ctrlKey && event.code === "KeyV") {
			pressedKeys.paste = false;
			// We have to clear out the previous binding, so let's use a setTimeout to push onto the event loop
			setTimeout(() => {
				pressedKeys.paste = true;
			});
		}
	}

	function onDocumentKeyUp(event: KeyboardEvent) {
		pressedKeys.shift = event.shiftKey;
		pressedKeys.ctrl = event.ctrlKey;
		if (event.shiftKey) {
			document.onselectstart = null;
		}
	}

	function onDocumentMouseDown() {
		pressedKeys.mouseDown = true;
	}

	function onDocumentMouseUp() {
		pressedKeys.mouseDown = false;
	}

	document.addEventListener("mousedown", onDocumentMouseDown);
	document.addEventListener("mouseup", onDocumentMouseUp);
	document.addEventListener("keydown", onDocumentKeyDown);
	document.addEventListener("keyup", onDocumentKeyUp);

	onUnmounted(() => {
		document.removeEventListener("mousedown", onDocumentMouseDown);
		document.removeEventListener("mouseup", onDocumentMouseUp);
		document.removeEventListener("keydown", onDocumentKeyDown);
		document.removeEventListener("keyup", onDocumentKeyUp);
	});

	provide(CellCopyKey, pressedKeys);

	return pressedKeys;
}

export function injectCellCopy() {
	return inject(CellCopyKey) as TCellCopyProvider;
}
