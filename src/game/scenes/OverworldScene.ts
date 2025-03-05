import { Tiles } from "@/enums/Tiles.ts";
import { EventBus } from "@/game/EventBus.ts";
import { tileBuilder } from "@/game/prefabs/Tile.ts";
import { BaseScene } from "@/game/scenes/BaseScene.ts";
import { IScreen } from "@/types/common.ts";

export class OverworldScene extends BaseScene {
    config: IScreen;

    constructor(config: IScreen) {
    	super(config.Name ?? `${config.X}${config.Y}`);
    	this.x = config.X;
    	this.y = config.Y;
    	this.name = config.Name;
    	this.config = config;
    }

    create() {
    	this.config.Tiles.forEach(({ Type, Children }) => {
    		const found = Tiles.find(({ name }) => Type === name);
    		if (found) {
    			tileBuilder(this, Children, found);
    		}
    	});
    	EventBus.emit("current-scene-ready", this);
    }
}
