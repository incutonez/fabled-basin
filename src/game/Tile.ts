import { Scene } from "phaser";
import StaticGroup = Phaser.Physics.Arcade.StaticGroup;
import { TWorldColors, WorldColors } from "@/enums/WorldColors.ts";
import { replaceColors } from "@/game/utils.ts";
import { IScreenTileChild } from "@/types/common.ts";

export interface IWall {
	scene: Scene;
	x: number;
	y: number;
	texture: string;
	group: StaticGroup;
	colors: TWorldColors[];
	frame: number;
}

export default class Wall extends Phaser.Physics.Arcade.Sprite {
	constructor({ scene, x, y, texture, group, colors, frame }: IWall) {
		super(scene, x, y, texture);
		const key = `${texture}_${frame}_${colors.join()}`;
		/* Only create the image if it doesn't exist... if we didn't do this, we'd get an error from Phaser, plus, it's
         * inefficient to change the coloring multiple times if we already have the image */
		if (!scene.textures.exists(key)) {
			replaceColors({
				frame,
				image: scene.textures.get(texture).getSourceImage() as HTMLImageElement,
				texture: scene.textures.createCanvas(key, 16, 16)!,
				colors: colors.flatMap((item, index, arr) => {
					if (index % 2 === 1) {
						return [];
					}
					// TODOJEF: Consider making a hash of WorldColors
					return {
						target: WorldColors.find(({ name }) => name === item)?.id ?? "",
						value: WorldColors.find(({ name }) => name === arr[index + 1])?.id ?? "",
					};
				}),
			});
		}
		group.create(x, y, key).setOrigin(0);
	}
}

export function tileBuilder(scene: Scene, texture: string, group: StaticGroup, children: IScreenTileChild[], frame: number) {
	children.forEach(({ X, Y, Colors }) => {
		new Wall({
			scene,
			texture,
			x: X,
			y: Y,
			group,
			colors: Colors,
			frame,
		});
	});
}
