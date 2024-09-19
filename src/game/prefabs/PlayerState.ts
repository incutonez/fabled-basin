import {
	CellSizeHalf,
	GridHeightPixels,
	GridWidthPixels,
	KEY_BINDINGS,
} from "@/game/globals.ts";
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
import Player from "@/game/prefabs/Player.ts";
import Tile from "@/game/prefabs/Tile.ts";
import { BaseScene } from "@/game/scenes/BaseScene.ts";
import { ITileShape } from "@/types/common.ts";

let anim: string;
let playerInput: CursorKeys;
const playerPosition: ITileShape = {
	x: -1,
	y: -1,
};

export class PlayerState extends Phaser.Plugins.ScenePlugin {
    player: Player;
    declare scene: BaseScene;
    transitioning = false;

    get playerPosition() {
    	return playerPosition;
    }

    set playerPosition({ x, y }: ITileShape) {
    	playerPosition.x = x;
    	playerPosition.y = y;
    }

    set playerInput(value: CursorKeys) {
    	playerInput = value;
    }

    get playerInput() {
    	return playerInput;
    }

    get playerDirection() {
    	return this.player.anims.getName();
    }

    constructor(scene: BaseScene, pluginManager: Phaser.Plugins.PluginManager, key: string) {
    	super(scene, pluginManager, key);
    	// TODOJEF: Do we need to clean up listeners?
    	scene.events.on("create", this.initPlayer, this);
    	scene.events.on("destroy", this.removeInput, this);
    }

    /**
     * We want our player to have global inputs, so we can have the same inputs being pressed across
     * screens... the only way to do this is have some global object that holds the initial instance
     * of the keys, and then we remove the keys from each scene when it's destroyed and add the
     * instance to the new scene when it's created.
     * Source: https://phaser.discourse.group/t/issue-when-holding-keyboard-input-as-the-scene-restart/12540/4?u=incutonez
     */
    initPlayer() {
    	this.player = new Player(this.scene, this.playerPosition.x, this.playerPosition.y);
    	const { playerInput } = this;
    	if (playerInput) {
    		for (const key of Object.values(playerInput)) {
    			this.scene!.input.keyboard!.addKey(key);
    		}
    	}
    	else {
    		// Create our global player input
    		this.playerInput = this.scene.input.keyboard?.addKeys(KEY_BINDINGS) as CursorKeys;
    	}
    }

    setTransitioning(value: boolean) {
    	if (value) {
    		this.player.setActive(false).setVisible(false);
    	}
    	else {
    		this.player.setActive(true).setVisible(true);
    		this.restorePosition();
    	}
    	this.transitioning = value;
    }

    restorePosition() {
    	this.player.anims.play(anim);
    	this.player.setPosition(this.playerPosition.x, this.playerPosition.y);
    }

    // TODOJEF: This should use the player's position and not the tile's
    savePosition({ config, x, y }: Tile) {
    	const { Transition } = config;
    	if (Transition) {
    		anim = this.playerDirection;
    		// We +/- 1 below for each coordinate because we don't want them butting directly up against the collision box
    		// Traveling to the left
    		if (anim === "left") {
    			x = GridWidthPixels - CellSizeHalf - 1;
    		}
    		// Traveling to the right
    		else if (anim === "right") {
    			x = CellSizeHalf + 1;
    		}
    		// Traveling up
    		else if (anim === "up") {
    			y = GridHeightPixels - CellSizeHalf - 1;
    		}
    		// Traveling down
    		else if (anim === "down") {
    			y = CellSizeHalf + 1;
    		}
    	}
    	this.playerPosition = {
    		x: x,
    		y: y,
    	};
    }

    removeInput() {
    	for (const key in this.playerInput) {
    		this.scene.input.keyboard?.removeKey(key, false);
    	}
    }
}
