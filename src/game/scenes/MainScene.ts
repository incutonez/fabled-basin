import { Scene } from "phaser";
import overworld from "@/assets/overworld.json";
import { EventBus } from "@/game/EventBus.ts";
import { PlayerState } from "@/game/prefabs/PlayerState.ts";
import { OverworldScene } from "@/game/scenes/OverworldScene.ts";
import { IOverworld } from "@/types/common.ts";

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
    	this.load.json("overworld", overworld);
    }

    create() {
    	this.loadWorld(this.cache.json.get("overworld"));
    	EventBus.on("loadWorld", (data: Record<string, IOverworld>) => {
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

    loadWorld(data: Record<string, IOverworld>) {
    	// TODOJEF: We need to cycle through each one and pick which one to start in... need a property for that
    	data["Test"].Children.forEach((child) => {
    		const newScene = new OverworldScene(child);
    		this.scene.add(newScene.Name, newScene);
    	});
    	this.playerState.playerPosition = {
    		x: data["Test"].Spawn.SceneX,
    		y: data["Test"].Spawn.SceneY,
    	};
    	this.scene.start(data["Test"].Spawn.Name);
    }
}
