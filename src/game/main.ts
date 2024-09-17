import { AUTO, Game } from "phaser";
import ScaleModes = Phaser.Scale.ScaleModes;
import { PlayerState } from "@/game/prefabs/PlayerState.ts";
import Tile from "@/game/prefabs/Tile.ts";
import { OverworldScene } from "@/game/scenes/OverworldScene.ts";

export class ZeldaGame extends Game {
    currentScreen: {
    	x: number;
    	y: number;
    };

    constructor() {
    	super({
    		type: AUTO,
    		parent: "game-container",
    		backgroundColor: "#ffefa6",
    		pixelArt: true,
    		// We need a zoom so our sprites aren't blurry
    		zoom: 2,
    		physics: {
    			default: "matter",
    			matter: {
    				debug: true,
    				gravity: {
    					x: 0,
    					y: 0,
    				},
    			},
    		},
    		/**
             * We want to create a 16Wx11H grid, where each cell is 16x16 pixels, so we do the maths,
             * and these are the values we come up with to set the base width and height, and then we scale
             * the game, so our sprites aren't blurry.  They probably wouldn't be blurry if we didn't have such
             * small sprites... if they were much larger dimensions, we probably wouldn't have these issues.
             */
    		width: 256,
    		height: 176,
    		scale: {
    			// Taken from https://newdocs.phaser.io/docs/3.55.2/Phaser.Scale.ScaleModes#FIT
    			mode: ScaleModes.HEIGHT_CONTROLS_WIDTH,
    		},
    		plugins: {
    			scene: [{
    				key: "playerState",
    				plugin: PlayerState,
    				start: false,
    				mapping: "playerState",
    			}],
    		},
    	});
    	this.currentScreen = {
    		x: 7,
    		y: 0,
    	};
    }

    protected start() {
    	super.start();
    	const startScene = new OverworldScene(this.currentScreen.x, this.currentScreen.y);
    	this.scene.add(startScene.Name, startScene, true);
    	this.events.on("transition", (tile: Tile) => {
    		const { Transition } = tile.config;
    		if (Transition) {
    			const { X = 0, Y = 0 } = Transition;
    			this.scene.remove(tile.scene.Name);
    			this.currentScreen.x += X;
    			this.currentScreen.y += Y;
    			const nextScene = new OverworldScene(this.currentScreen.x, this.currentScreen.y);
    			this.scene.add(nextScene.Name, nextScene, true);
    		}
    	});
    }
}

