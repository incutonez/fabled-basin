import { IsArray, IsString } from "class-validator";
import { IsRequired, ModelTransform } from "@/models/decorators";
import { GameEnemy } from "@/models/GameEnemy";
import { GameItem } from "@/models/GameItem";
import { GameScreen, ILoadData } from "@/models/GameScreen";
import { GameTile } from "@/models/GameTile";
import { Parent, ViewModel } from "@/models/ViewModel";

export class GameTileCell extends ViewModel {
	@IsArray()
	Coordinates: number[] = [];

	@IsRequired()
	@IsString()
	Name = "";

	[Parent]?: GameScreen;

	@ModelTransform(() => GameTile)
	tile = GameTile.create();

	@ModelTransform(() => GameItem)
	item = GameItem.create();

	@ModelTransform(() => GameEnemy)
	enemy = GameEnemy.create();

	init() {
		this.tile.cell = this;
		this.item.cell = this;
		this.enemy.cell = this;
	}

	reset() {
		this.tile.reset();
	}

	/* TODO: Potentially don't lean on there being a parent and just return the x, y coords as a string and
	 * have the grid do a lookup to find that cell with that string key */
	getIndex() {
		return this[Parent]?.cells.indexOf(this);
	}

	get id() {
		return `${this.x}_${this.y}`;
	}

	get x() {
		return this.Coordinates[0];
	}

	get y() {
		return this.Coordinates[1];
	}

	getConfig({ Tiles = [], Items = [], Enemies = [] }: ILoadData) {
		const { tile, item, enemy } = this;
		if (tile.hasImage()) {
			const grid = this[Parent];
			const tileType = tile.getTypeKey();
			const config = tile.getConfig();
			const cellSize = grid?.CellSize || 1;
			const { OffsetX = 0, OffsetY = 0 } = tile;
			config.X = (this.x + OffsetX) * cellSize;
			config.Y = (this.y + OffsetY) * cellSize;
			const found = Tiles.find(({ Type }) => Type === tileType);
			if (found) {
				found.Children.push(config);
			}
			else {
				Tiles.push({
					Type: tileType!,
					Children: [config],
				});
			}
		}
		if (item.hasImage()) {
			Items.push(item.getConfig());
		}
		if (enemy.hasImage()) {
			Enemies.push(enemy.getConfig());
		}
	}
}
