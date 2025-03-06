import { TTiles } from "@/enums/Tiles.ts";
import { TWorldColors } from "@/enums/WorldColors.ts";

import Vector2Like = Phaser.Types.Math.Vector2Like;

export type ITileShape = Vector2Like;

/**
 * TODOJEF: May want to consider splitting this from each usage... e.g. it's used for Colors, Templates, Audio, and
 * Animations.  Probably want an interface enum for each of those, instead of reusing the same one.
 */
export interface IGameEnum {
	id: string | number;
	name: string;
	displayName?: string;
}

export interface IGameObject extends IGameEnum {
	shape?: ITileShape[];
	imageSrc?: string;
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
