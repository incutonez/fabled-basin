import { Scene } from "phaser";
import overworld from "@/assets/overworld.json";
import { Tiles } from "@/enums/Tiles.ts";
import { EventBus } from "@/game/EventBus.ts";
import { CurrentScreen, GridCenterX, GridCenterY } from "@/game/globals.ts";
import Player from "@/game/Player.ts";
import { tileBuilder } from "@/game/Tile.ts";
import { IScreen } from "@/types/common.ts";

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
		this.load.json("overworld", overworld);
	}

	create() {
		const data: Record<string, IScreen> = this.cache.json.get("overworld");
		const walls = this.physics.add.staticGroup();
		data[CurrentScreen].Tiles.forEach(({ Type, Children }) => {
			const found = Tiles.find(({ name }) => Type === name);
			if (found) {
				tileBuilder(this, "tiles", walls, Children, found.id);
			}
		});
		const player = new Player(this, GridCenterX, GridCenterY);
		this.physics.add.collider(walls, player);
		EventBus.emit("current-scene-ready", this);
	}
}
