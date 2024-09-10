import { AUTO, Game } from "phaser";
import { Game as MainGame } from "./scenes/Game";
import ScaleModes = Phaser.Scale.ScaleModes;

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
export function startGame() {
	return new Game({
		type: AUTO,
		parent: "app",
		backgroundColor: "#ffefa6",
		scene: [MainGame],
		// We need a zoom so our sprites aren't blurry
		zoom: 2,
		physics: {
			default: "arcade",
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
			mode: ScaleModes.FIT,
		},
	});
}

