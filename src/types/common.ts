import { IOption } from "@incutonez/core-ui/types";
import { TTiles } from "@/enums/Tiles.ts";
import { TWorldColors } from "@/enums/WorldColors.ts";

import Vector2Like = Phaser.Types.Math.Vector2Like;

export type ITileShape = Vector2Like;

export interface IGameEnum extends IOption {
	imageSrc?: string;
	displayName?: string;
}

export interface ITile {
	id: number;
	name?: string;
	displayName?: string;
	shape?: ITileShape[];
	imageSrc?: string;
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
	Transition?: IScreen;
}

export interface IScreenTile {
	Type: TTiles;
	Children: IScreenTileChild[];
}

export interface IWorld {
	Name: string;
	IsInitialWorld: boolean;
	Spawn: {
		SceneX: number;
		SceneY: number;
		Name: string;
	};
	Children: IScreen[];
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
	Template?: string;
	IsFloating?: boolean;
}

export import BaseSprite = Phaser.Physics.Matter.Sprite;

export import BaseGroup = Phaser.GameObjects.Group;

export import BaseWorld = Phaser.Physics.Matter.World;
