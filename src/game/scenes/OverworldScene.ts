import { Scene } from "phaser";
import { Tiles } from "@/enums/Tiles.ts";
import { GridCenterX, GridCenterY } from "@/game/globals.ts";
import Player from "@/game/Player.ts";
import { tileBuilder } from "@/game/Tile.ts";
import { IScreen } from "@/types/common.ts";

export class OverworldScene extends Scene {
    config: IScreen;

    get Name() {
    	const { Name, X, Y } = this.config;
    	return Name ?? `${X}${Y}`;
    }

    constructor(config: IScreen) {
    	super(config.Name ?? `${config.X}${config.Y}`);
    	this.config = config;
    }

    create() {
    	// TODOJEF: Need to load their coords from a state
    	new Player(this, GridCenterX, GridCenterY);
    	this.config.Tiles.forEach(({ Type, Children }) => {
    		const found = Tiles.find(({ name }) => Type === name);
    		if (found) {
    			tileBuilder(this, "tiles", Children, found);
    		}
    	});
    }
}
