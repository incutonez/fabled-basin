import { Scene } from "phaser";
import overworld from "@/assets/overworld.json";
import { OverworldScene } from "@/game/scenes/OverworldScene.ts";
import { IScreen } from "@/types/common.ts";

export class MainScene extends Scene {
	constructor() {
		super("MainScene");
	}

	preload() {
		this.load.spritesheet("player", "character.png", {
			frameWidth: 16,
			frameHeight: 16,
			spacing: 14,
		});
		this.load.spritesheet("tiles", "tiles.png", {
			frameWidth: 16,
			frameHeight: 16,
			spacing: 4,
		});
		this.load.json("overworld", overworld);
	}

	create() {
		const data: Record<string, IScreen> = this.cache.json.get("overworld");
		for (const key in data) {
			const newScene = new OverworldScene(data[key]);
			this.scene.add(newScene.Name, newScene);
		}
		this.scene.start("70");
	}
}
