import overworld from "@/assets/overworld.json";
import { Tiles } from "@/enums/Tiles.ts";
import { EventBus } from "@/game/EventBus.ts";
import { tileBuilder } from "@/game/prefabs/Tile.ts";
import { BaseScene } from "@/game/scenes/BaseScene.ts";
import { IScreen } from "@/types/common.ts";

export class OverworldScene extends BaseScene {
	constructor(x: number, y: number, name?: string) {
		super(name ?? `${x}${y}`);
		this.x = x;
		this.y = y;
		this.name = name;
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
		const config = data[this.Name];
		config.Tiles.forEach(({ Type, Children }) => {
			const found = Tiles.find(({ name }) => Type === name);
			if (found) {
				tileBuilder(this, "tiles", Children, found);
			}
		});
		EventBus.emit("current-scene-ready", this);
	}
}
