import { GridCenterX, GridCenterY, KEY_BINDINGS } from "@/game/globals.ts";
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
import Player from "@/game/prefabs/Player.ts";
import { BaseScene } from "@/game/scenes/BaseScene.ts";

let playerInput: CursorKeys;

export class PlayerState extends Phaser.Plugins.ScenePlugin {
    player: Player;
    declare scene: BaseScene;

    set playerInput(value: CursorKeys) {
    	playerInput = value;
    }

    get playerInput() {
    	return playerInput;
    }

    constructor(scene: BaseScene, pluginManager: Phaser.Plugins.PluginManager, key: string) {
    	super(scene, pluginManager, key);
    	// TODOJEF: Need to load player coords from a state
    	scene.events.on("create", this.setKeys, this);
    	scene.events.on("destroy", this.removeInput, this);
    }

    /**
     * We want our player to have global inputs, so we can have the same inputs being pressed across
     * screens... the only way to do this is have some global object that holds the initial instance
     * of the keys, and then we remove the keys from each scene when it's destroyed and add the
     * instance to the new scene when it's created.
     * Source: https://phaser.discourse.group/t/issue-when-holding-keyboard-input-as-the-scene-restart/12540/4?u=incutonez
     */
    setKeys() {
    	this.player = new Player(this.scene, GridCenterX, GridCenterY);
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

    removeInput() {
    	for (const key in this.playerInput) {
    		this.scene.input.keyboard?.removeKey(key, false);
    	}
    }
}
