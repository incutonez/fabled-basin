import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
import { BaseScene } from "@/game/scenes/BaseScene.ts";
import { BaseSprite } from "@/types/common.ts";

const Velocity = 1;
const FrameRate = 10;

/* TODOJEF: Change player size, so only waist hits tiles... use setSize
 * https://github.com/phaserjs/examples/blob/master/public/src/physics/arcade/smaller%20bounding%20box.js#L16 */
export default class Player extends BaseSprite {
    cursor: CursorKeys;
    scene: BaseScene;

    constructor(scene: BaseScene, x: number, y: number, texture = "player") {
    	super(scene.matter.world, x, y, texture);
    	this.scene = scene;
    	scene.add.existing(this);
    	/**
         * The update method does not get called on its own, so we have to listen for whenever the
         * scene gets updated, so we can call our internal method.
         * https://github.com/phaserjs/phaser/issues/3378#issuecomment-578684584
         */
    	scene.events.on("update", this.update, this);
    	// If we don't have this, when the player collides with something, they start spinning
    	this.setFixedRotation();
    	this.anims.create({
    		key: "left",
    		frames: scene.anims.generateFrameNumbers("player", {
    			frames: [1, 5],
    		}),
    		frameRate: FrameRate,
    		repeat: -1,
    	});

    	this.anims.create({
    		key: "right",
    		frames: scene.anims.generateFrameNumbers("player", {
    			frames: [3, 7],
    		}),
    		frameRate: FrameRate,
    		repeat: -1,
    	});

    	this.anims.create({
    		key: "down",
    		frames: scene.anims.generateFrameNumbers("player", {
    			frames: [0, 4],
    		}),
    		frameRate: FrameRate,
    		repeat: -1,
    	});

    	this.anims.create({
    		key: "up",
    		frames: scene.anims.generateFrameNumbers("player", {
    			frames: [2, 6],
    		}),
    		frameRate: FrameRate,
    		repeat: -1,
    	});
    }

    update() {
    	const { anims } = this;
    	const { playerInput } = this.scene.playerState;
    	if (playerInput) {
    		let velocityX = 0;
    		let velocityY = 0;
    		let animation;
    		if (playerInput.left.isDown) {
    			velocityX = -Velocity;
    			animation = "left";
    		}
    		else if (playerInput.right.isDown) {
    			velocityX = Velocity;
    			animation = "right";
    		}
    		if (playerInput.down.isDown) {
    			velocityY = Velocity;
    			animation = "down";
    		}
    		else if (playerInput.up.isDown) {
    			velocityY = -Velocity;
    			animation = "up";
    		}
    		this.setVelocity(velocityX, velocityY);
    		if (animation) {
    			anims.play(animation, true);
    		}
    		else {
    			// If no active animation, stop all animations
    			anims.stop();
    		}
    	}
    }
}
