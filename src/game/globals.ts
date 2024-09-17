const { KeyCodes } = Phaser.Input.Keyboard;

export const CellSize = 16;

export const CellSizeHalf = CellSize / 2;

export const GridHeight = 11;

export const GridWidth = 16;

export const GridCenterX = GridWidth / 2 * CellSize;

export const GridCenterY = GridHeight / 2 * CellSize;

export const KEY_BINDINGS = {
	up: KeyCodes.UP || KeyCodes.W,
	down: KeyCodes.DOWN || KeyCodes.S,
	left: KeyCodes.LEFT || KeyCodes.A,
	right: KeyCodes.RIGHT || KeyCodes.D,
};
