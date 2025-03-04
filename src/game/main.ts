import { AUTO, Game } from "phaser";
import ScaleModes = Phaser.Scale.ScaleModes;
import { GridHeightPixels, GridWidthPixels } from "@/game/globals.ts";
import { PlayerState } from "@/game/prefabs/PlayerState.ts";
import Tile from "@/game/prefabs/Tile.ts";
import { MainScene } from "@/game/scenes/MainScene.ts";
import { OverworldScene } from "@/game/scenes/OverworldScene.ts";

export class FableBasin extends Game {
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
    		scene: [MainScene],
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
    	this.events.on("transition", (tile: Tile) => {
    		const { Transition } = tile.config;
    		if (Transition) {
    			const { X = 0, Y = 0 } = Transition;
    			this.currentScreen.x = X;
    			this.currentScreen.y = Y;
    			const currentScene = tile.scene;
    			const { up, down, left, right } = currentScene.playerState.inputState;
    			const nextScene = currentScene.scene.get(`${this.currentScreen.x}${this.currentScreen.y}`) as OverworldScene;
    			const cam = currentScene.cameras.main;
    			const targetCam = nextScene.cameras.main;
    			currentScene.playerState.savePosition(tile);
    			currentScene.scene.transition({
    				target: nextScene?.Name,
    				sleep: true,
    				duration: 1500,
    				onStart() {
    					currentScene.playerState.transitioning = true;
    					nextScene.playerState.setTransitioning(true);
    				},
    				onUpdate(progress: number) {
    					const t = Phaser.Math.Easing.Quadratic.InOut(progress);
    					if (left) {
    						cam.setScroll(targetCam.x, targetCam.y);
    						cam.setViewport(t * GridWidthPixels, 0, (1 - t) * GridWidthPixels, cam.height);
    						targetCam.setViewport(0, 0, t * GridWidthPixels, targetCam.height);
    						targetCam.setScroll((1 - t) * GridWidthPixels, 0);
    					}
    					else if (right) {
    						cam.setScroll(t * GridWidthPixels, 0);
    						cam.setViewport(0, 0, (1 - t) * GridWidthPixels, cam.height);
    						targetCam.setScroll(cam.x, cam.y);
    						targetCam.setViewport((1 - t) * GridWidthPixels, 0, t * GridWidthPixels, targetCam.height);
    					}
    					else if (up) {
    						cam.setScroll(targetCam.x, targetCam.y);
    						cam.setViewport(0, t * GridHeightPixels, cam.width, (1 - t) * GridHeightPixels);
    						targetCam.setViewport(0, 0, targetCam.width, t * GridHeightPixels);
    						targetCam.setScroll(0, (1 - t) * GridHeightPixels);
    					}
    					else if (down) {
    						cam.setScroll(0, t * GridHeightPixels);
    						cam.setViewport(0, 0, cam.width, (1 - t) * GridHeightPixels);
    						targetCam.setScroll(cam.x, cam.y);
    						targetCam.setViewport(0, (1 - t) * GridHeightPixels, targetCam.width, t * GridHeightPixels);
    					}
    					if (progress === 1) {
    						nextScene.scene.resume();
    						nextScene.playerState.setTransitioning(false);
    					}
    				},
    			});
    		}
    	});
    }
}

