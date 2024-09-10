import { Scene } from "phaser";
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;

const Velocity = 80;
const FrameRate = 10;

export default class Player extends Phaser.Physics.Arcade.Sprite {
    cursor?: CursorKeys;

    constructor(scene: Scene, x: number, y: number, texture = "player") {
    	super(scene, x, y, texture);
    	scene.add.existing(this);
    	scene.physics.add.existing(this);
    	/**
         * The update method does not get called on its own, so we have to listen for whenever the
         * scene gets updated, so we can call our internal method.
         * https://github.com/phaserjs/phaser/issues/3378#issuecomment-578684584
         */
    	scene.events.on("update", this.update, this);
    	this.scene = scene;
    	this.setOrigin(0, 0);
    	this.setCollideWorldBounds(true);
    	this.cursor = scene.input.keyboard?.createCursorKeys();
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

    update(time: number, delta: number) {
    	super.update(time, delta);
    	const { cursor, anims } = this;
    	if (cursor) {
    		let velocityX = 0;
    		let velocityY = 0;
    		let animation;
    		if (cursor.left.isDown) {
    			velocityX = -Velocity;
    			animation = "left";
    		}
    		else if (cursor.right.isDown) {
    			velocityX = Velocity;
    			animation = "right";
    		}
    		if (cursor.down.isDown) {
    			velocityY = Velocity;
    			animation = "down";
    		}
    		else if (cursor.up.isDown) {
    			velocityY = -Velocity;
    			animation = "up";
    		}
    		this.setVelocityX(velocityX);
    		this.setVelocityY(velocityY);
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
