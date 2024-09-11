import { Scene } from "phaser";
import { EventBus } from "@/game/EventBus.ts";
import Player from "@/game/Player.ts";
import { tileBuilder } from "@/game/Tile.ts";

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
		this.load.spritesheet("tiles", "tiles.png", {
			frameWidth: 16,
			frameHeight: 16,
			spacing: 4,
		});
	}

	create() {
		const walls = this.physics.add.staticGroup();
		tileBuilder(this, "tiles", walls, [[0, 0], [16, 0], [32, 0]], "FF0000", 1);
		tileBuilder(this, "tiles", walls, [[48, 0]], "00FF00", 2);
		tileBuilder(this, "tiles", walls, [[64, 0]], "00FF00", 18);
		const player = new Player(this, 32, 32);
		this.physics.add.collider(walls, player);
		EventBus.emit("current-scene-ready", this);
	}
}
