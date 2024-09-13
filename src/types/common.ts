import { TTiles } from "@/enums/Tiles.ts";
import { TWorldColors } from "@/enums/WorldColors.ts";

export interface ITile {
	id: number;
	name?: string;
	displayName?: string;
	[key: string]: unknown;
}

export interface IWorldColor {
	id: string;
	name: string;
	displayName: string;
}

export interface IScreenTileChild {
	X: number;
	Y: number;
	Colors: TWorldColors[];
}

export interface IScreenTile {
	Type: TTiles;
	Children: IScreenTileChild[];
}

export interface IScreen {
	X: number;
	Y: number;
	Name: string;
	GroundColor: string;
	AccentColor: string;
	Tiles: IScreenTile[];
	// TODOJEF: TYPE PROPERLY
	Items: IScreenTile[];
	// TODOJEF: TYPE PROPERLY
	Enemies: IScreenTile[];
}
