import { Scene } from "phaser";
import Player from "@/game/Player.ts";
import { EventBus } from "../EventBus";

export class Game extends Scene {
	constructor() {
		super("Game");
	}

	preload() {
		this.load.spritesheet("player", "character.png", {
			frameWidth: 16,
			frameHeight: 16,
			spacing: 14,
		});
		this.load.spritesheet("block", "tiles.png", {
			frameWidth: 16,
			frameHeight: 16,
		});
		this.load.spritesheet("statue", "tiles.png", {
			frameWidth: 16,
			frameHeight: 16,
			startFrame: 1,
			spacing: 4,
		});
		this.load.spritesheet("bush", "tiles.png", {
			frameWidth: 16,
			frameHeight: 16,
			startFrame: 2,
			spacing: 4,
		});
	}

	create() {
		this.add.image(0, 0, "block").setOrigin(0, 0);
		this.add.image(16, 0, "statue").setOrigin(0, 0);
		this.add.image(32, 0, "bush").setOrigin(0, 0);
		new Player(this, 32, 32);
		EventBus.emit("current-scene-ready", this);
	}
}
