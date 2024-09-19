import { Scene } from "phaser";
import game from "@/assets/game.json";
import { EventBus } from "@/game/EventBus.ts";
import { PlayerState } from "@/game/prefabs/PlayerState.ts";
import { OverworldScene } from "@/game/scenes/OverworldScene.ts";
import { IWorld } from "@/types/common.ts";

export class MainScene extends Scene {
    playerState: PlayerState;

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
    	this.cache.json.add("game", game);
    }

    create() {
    	this.loadWorld(this.cache.json.get("game"));
    	EventBus.on("loadWorld", (data: IWorld[]) => {
    		this.cache.json.remove("game");
    		this.cache.json.add("game", data);
    		for (let i = this.game.scene.scenes.length - 1; i >= 0; i--) {
    			const scene = this.game.scene.scenes[i];
    			if (scene !== this) {
    				this.scene.remove(scene);
    			}
    		}
    		this.loadWorld(data);
    	});
    }

    loadWorld(data: IWorld[]) {
    	let startWorld: IWorld | undefined;
    	data.forEach((world) => {
    		if (world.IsInitialWorld) {
    			startWorld = world;
    		}
    		world.Children.forEach((child) => {
    			const newScene = new OverworldScene(child);
    			// TODOJEF: This will be an issue... need to prepend parent's name here?
    			this.scene.add(newScene.Name, newScene);
    		});
    	});
    	if (startWorld) {
    		this.playerState.playerPosition = {
    			x: startWorld.Spawn.SceneX,
    			y: startWorld.Spawn.SceneY,
    		};
    		this.scene.start(startWorld.Spawn.Name);
    	}
    }
}
