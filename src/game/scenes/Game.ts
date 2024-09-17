import { Scene } from "phaser";
import overworld from "@/assets/overworld.json";
import { EventBus } from "@/game/EventBus.ts";
import Player from "@/game/Player.ts";
import { OverworldScene } from "@/game/scenes/OverworldScene.ts";
import Tile from "@/game/Tile.ts";
import { IScreen } from "@/types/common.ts";

export class Game extends Scene {
    player: Player;
    currentScreen: {
    	x: number;
    	y: number;
    };

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
    	this.currentScreen = {
    		x: 7,
    		y: 0,
    	};
    	const scene = new OverworldScene(data[`${this.currentScreen.x}${this.currentScreen.y}`]);
    	this.scene.add(scene.Name, scene, true);
    	this.game.events.on("transition", (tile: Tile) => {
    		const { Transition } = tile.config;
    		if (Transition) {
    			const { X = 0, Y = 0 } = Transition;
    			this.scene.remove(`${this.currentScreen.x}${this.currentScreen.y}`);
    			this.currentScreen.x += X;
    			this.currentScreen.y += Y;
    			const scene = new OverworldScene(data[`${this.currentScreen.x}${this.currentScreen.y}`]);
    			this.scene.add(scene.Name, scene, true);
    		}
    	});
    	EventBus.emit("current-scene-ready", this);
    }
}
