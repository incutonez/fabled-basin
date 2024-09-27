import { BaseScene } from "@/game/scenes/BaseScene.ts";
import { BaseSprite } from "@/types/common.ts";

const Velocity = 1.5;
const FrameRate = 10;

/* TODOJEF: Change player size, so only waist hits tiles... use setSize
 * https://github.com/phaserjs/examples/blob/master/public/src/physics/arcade/smaller%20bounding%20box.js#L16 */
export default class Player extends BaseSprite {
    scene: BaseScene;
    declare body: MatterJS.BodyType;

    constructor(scene: BaseScene, x: number, y: number, texture = "guy") {
    	super(scene.matter.world, x, y, texture);
    	this.scene = scene;
    	scene.add.existing(this);
    	// Adjust the player's collision box
    	this.body?.vertices?.forEach((vert, index) => {
    		if (index === 0) {
    			vert.x += 10;
    			vert.y += 14;
    		}
    		else if (index === 1) {
    			vert.x -= 10;
    			vert.y += 14;
    		}
    		else if (index === 2) {
    			vert.x -= 10;
    			vert.y -= 8;
    		}
    		else {
    			vert.x += 10;
    			vert.y -= 8;
    		}
    	});
    	/**
         * The update method does not get called on its own, so we have to listen for whenever the
         * scene gets updated, so we can call our internal method.
         * https://github.com/phaserjs/phaser/issues/3378#issuecomment-578684584
         */
    	scene.events.on("update", this.update, this);
    	// If we don't have this, when the player collides with something, they start spinning
    	this.setFixedRotation();
    	this.anims.create({
    		key: "up",
    		frames: scene.anims.generateFrameNumbers(texture, {
    			start: 4,
    			end: 7,
    		}),
    		frameRate: FrameRate,
    		repeat: -1,
    	});
    	this.anims.create({
    		key: "walk",
    		frames: scene.anims.generateFrameNumbers(texture, {
    			start: 19,
    			end: 22,
    		}),
    		frameRate: FrameRate,
    		repeat: -1,
    	});
    	this.anims.create({
    		key: "down",
    		frames: scene.anims.generateFrameNumbers(texture, {
    			start: 34,
    			end: 37,
    		}),
    		frameRate: FrameRate,
    		repeat: -1,
    	});
    }

    update() {
    	const { anims } = this;
    	const { playerInput, transitioning } = this.scene.playerState;
    	if (playerInput && !transitioning) {
    		let velocityX = 0;
    		let velocityY = 0;
    		let flipX = false;
    		let animation;
    		if (playerInput.left.isDown) {
    			velocityX = -Velocity;
    			animation = "walk";
    			flipX = true;
    		}
    		else if (playerInput.right.isDown) {
    			velocityX = Velocity;
    			animation = "walk";
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
    		// Only flip if we've got a velocity, otherwise, we want the flip to persist when the player's stopped
    		if (velocityX || velocityY) {
    			this.setFlipX(flipX);
    		}
    		if (animation) {
    			anims.play(animation, true);
    		}
    		else {
    			const currentAnim = this.anims.getName();
    			if (currentAnim === "walk") {
    				this.setFrame(this.anims.get("walk").frames[0].textureFrame);
    			}
    			else {
    				// If no active animation, stop all animations
    				anims.stop();
    			}
    		}
    	}
    }
}
