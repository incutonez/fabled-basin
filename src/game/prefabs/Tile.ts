import { TilesTransition } from "@/enums/Tiles.ts";
import { WorldColors } from "@/enums/WorldColors.ts";
import { CellSizeHalf } from "@/game/globals.ts";
import { BaseScene } from "@/game/scenes/BaseScene.ts";
import { replaceColors } from "@/game/utils.ts";
import { BaseSprite, IScreenTileChild, ITile, ITileShape } from "@/types/common.ts";

export interface IWall {
	scene: BaseScene;
	child: IScreenTileChild;
	tile: ITile;
}

export default class Tile extends BaseSprite {
    tile: ITile;
    config: IScreenTileChild;
    declare scene: BaseScene;

    constructor({ scene, child, tile }: IWall) {
    	const { X, Y, Colors = [] } = child;
    	const texture = `tiles_${tile.name!}`;
    	super(scene.matter.world, X + CellSizeHalf, Y + CellSizeHalf, texture);
    	const key = `${texture}_${tile.name}_${Colors.join()}`;
    	this.tile = tile;
    	this.config = child;
    	/* Only create the image if it doesn't exist... if we didn't do this, we'd get an error from Phaser, plus, it's
         * inefficient to change the coloring multiple times if we already have the image */
    	if (!scene.textures.exists(key)) {
    		replaceColors({
    			image: scene.textures.get(texture).getSourceImage() as HTMLImageElement,
    			texture: scene.textures.createCanvas(key, 16, 16)!,
    			colors: Colors.flatMap((item, index, arr) => {
    				if (index % 2 === 1) {
    					return [];
    				}
    				let target = "";
    				let value = "";
    				for (const { name, id } of WorldColors) {
    					if (name === item) {
    						target = id as string;
    					}
    					if (name === arr[index + 1]) {
    						value = id as string;
    					}
    				}
    				// TODOJEF: Consider making a hash of WorldColors
    				return {
    					target,
    					value,
    				};
    			}),
    		});
    	}
    	if (tile === TilesTransition) {
    		this.on("collide", () => {
    			if (!scene.playerState.transitioning) {
    				scene.game.events.emit("transition", this);
    			}
    		});
    	}
    	this.createBody(tile.shape);
    	this.setDisplayOrigin(CellSizeHalf, CellSizeHalf);
    	this.setTexture(key);
    	this.setStatic(true);
    	scene.add.existing(this);
    }

    createBody(vertices?: ITileShape[]) {
    	if (!vertices) {
    		return;
    	}
    	const body = this.scene.matter.add.polygon(this.x, this.y, vertices.length, 16, {
    		isStatic: true,
    		vertices,
    	});
    	const offsetX = body.centerOffset.x - CellSizeHalf;
    	const offsetY = body.centerOffset.y - CellSizeHalf;
    	body.vertices?.forEach((vert) => {
    		vert.x += offsetX;
    		vert.y += offsetY;
    	});
    	this.setExistingBody(body);
    }
}

export function tileBuilder(scene: BaseScene, children: IScreenTileChild[], tile: ITile) {
	return children.map((child) => {
		return new Tile({
			scene,
			child,
			tile,
		});
	});
}
