import { Scene } from "phaser";
import StaticGroup = Phaser.Physics.Arcade.StaticGroup;
import { replaceColors } from "@/game/utils.ts";

export interface IWall {
	scene: Scene;
	x: number;
	y: number;
	texture: string;
	group: StaticGroup;
	color: string;
	frame: number;
}

export default class Wall extends Phaser.Physics.Arcade.Sprite {
	constructor({ scene, x, y, texture, group, color, frame }: IWall) {
		super(scene, x, y, texture);
		const key = `${texture}_${frame}_${color}`;
		/* Only create the image if it doesn't exist... if we didn't do this, we'd get an error from Phaser, plus, it's
         * inefficient to change the coloring multiple times if we already have the image */
		if (!scene.textures.exists(key)) {
			replaceColors({
				frame,
				image: scene.textures.get(texture).getSourceImage() as HTMLImageElement,
				texture: scene.textures.createCanvas(key, 16, 16)!,
				colors: [{
					target: "FFFFFF",
					value: color,
				}, {
					target: "1A38FF",
					value: color,
				}],
			});
		}
		group.create(x, y, key).setOrigin(0);
	}
}

export function tileBuilder(scene: Scene, texture: string, group: StaticGroup, coords: number[][], color: string, frame: number) {
	coords.forEach(([x, y]) => {
		new Wall({
			scene,
			texture,
			x,
			y,
			group,
			color,
			frame,
		});
	});
}
