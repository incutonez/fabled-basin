import { isEmpty, removeItem } from "@incutonez/core-ui/utils";
import { IsArray, IsBoolean, IsInt, IsNumber, IsString } from "class-validator";
import { findRecordByName, getNameById } from "@/enums/helper";
import { Items as EnumItems } from "@/enums/Items";
import { Enemies as EnumEnemies } from "@/enums/NPCs";
import { Tiles as EnumTiles } from "@/enums/Tiles";
import { WorldColors, WorldColorsBrown, WorldColorsTan } from "@/enums/WorldColors";
import { ModelTransform } from "@/models/decorators";
import { IGameEnemyConfig } from "@/models/GameEnemy";
import { IGameItemConfig } from "@/models/GameItem";
import { getDefaultTileColors, IGameTileMeta } from "@/models/GameTile";
import { GameTileCell } from "@/models/GameTileCell";
import { Parent, ViewModel } from "@/models/ViewModel";

export interface ILoadData {
	Tiles?: IGameTileMeta[];
	Items?: IGameItemConfig[];
	Enemies?: IGameEnemyConfig[];
}

export class GameScreen extends ViewModel {
	@IsNumber()
	X = 0;

	@IsNumber()
	Y = 0;

	@IsBoolean()
	OriginTopLeft = true;

	@IsNumber()
	CellSize = 16;

	@IsString()
  	AccentColor = WorldColorsBrown.id;

	@IsString()
	GroundColor = WorldColorsTan.id;

	@IsBoolean()
	IsCastle = false;

	// This is used for when we have something that's not part of the Overworld, like a shop or castle
	@IsBoolean()
	IsFloating = false;

	// This value refers to an enum in ScreenTemplates
	@IsString()
	Template = "";

	@IsArray()
	@ModelTransform(() => GameTileCell)
	cells: GameTileCell[] = [];

	@IsInt()
	totalRows = 0;

	@IsInt()
	totalColumns = 0;

	@IsString()
	_name = "";

	set Name(value) {
		this._name = value;
	}

	get Name() {
		let { _name } = this;
		if (!_name) {
			_name = `${this.X}${this.Y}`;
		}
		return _name;
	}

	init() {
		const config: GameTileCell[] = [];
		for (let row = 0; row < this.totalRows; row++) {
			for (let column = 0; column < this.totalColumns; column++) {
				config.push(GameTileCell.create({
					Coordinates: [column, row],
				}, {
					init: true,
					[Parent]: this,
				}));
			}
		}
		this.cells = config;
	}

	/**
   * This method is used when loading from a file
   * @param {Object} data
   * This looks like the data object that's used in C#
   * TODO: Should probably create a UI model for that
   */
	async loadFileData(data: ILoadData = {}) {
		const { Tiles = [], Items = [], Enemies = [] } = data;
		// Loop through the entire grid to find and update any children in the data
		for (const cell of this.cells) {
			let found = false;
			const { x, y } = cell;
			for (const tile of Tiles) {
				for (const child of tile.Children) {
					if (child.X === x && child.Y === y) {
						found = true;
						const foundTile = findRecordByName(EnumTiles, tile.Type);
						const tileColors = getDefaultTileColors(foundTile!);
						const { Colors } = child;
						if (Colors) {
							for (let i = 0; i < Colors.length; i += 2) {
								const target = findRecordByName(WorldColors, Colors[i]);
								const foundColor = tileColors.find((color) => color.Target === target);
								if (foundColor) {
									foundColor.Value = findRecordByName(WorldColors, Colors[i + 1])!;
								}
							}
						}
						cell.tile.set({
							Type: foundTile,
							Transition: GameScreen.create(child.Transition),
							Colors: tileColors,
						});
						removeItem(tile.Children, child);
						break;
					}
				}
				if (found) {
					break;
				}
			}
			if (!found) {
				cell.tile.reset();
			}
			// Unset, as we're using for next loop
			found = false;
			for (const item of Items) {
				if (item.X === x && item.Y === y) {
					found = true;
					removeItem(Items, item);
					const itemType = item.Config.Type;
					cell.item.set({
						Type: findRecordByName(EnumItems, itemType),
					});
					break;
				}
			}
			if (!found) {
				cell.item.reset();
			}
			// Unset, as we're using for next loop
			found = false;
			for (const value of Enemies) {
				if (value.X === x && value.Y === y) {
					found = true;
					removeItem(Enemies, value);
					cell.enemy.set({
						Health: value.Health,
						HealthModifier: value.HealthModifier,
						Speed: value.Speed,
						TouchDamage: value.TouchDamage,
						WeaponDamage: value.WeaponDamage,
						Type: findRecordByName(EnumEnemies, value.Type),
					});
					break;
				}
			}
			if (!found) {
				cell.enemy.reset();
			}
			// Unset, as we're using for next loop
			found = false;
		}
	}

	getCell(x: number, y: number) {
		return this.cells[y * this.totalColumns + x];
	}

	getAdjacentNodes(node: GameTileCell) {
		const { x, y } = node;
		const nodes = [this.getCell(x - 1, y), this.getCell(x + 1, y), this.getCell(x, y - 1), this.getCell(x, y + 1)];
		const tileType = node.tile.Type;
		// Some of the nodes from above might be undefined or not have the same type, so let's filter those out
		return nodes.filter((record) => record?.tile.TileType === tileType);
	}

	findAdjacentNodes(startNode: GameTileCell = this.cells[0], traversedNodes: GameTileCell[] = []) {
		const nodes: GameTileCell[] = [];
		const adjacentNodes = this.getAdjacentNodes(startNode);
		if (traversedNodes.indexOf(startNode) === -1) {
			traversedNodes.push(startNode);
			nodes.push(startNode);
		}
		for (const adjacentNode of adjacentNodes) {
			if (!traversedNodes.find((node) => node === adjacentNode)) {
				const subNodes = this.findAdjacentNodes(adjacentNode, traversedNodes);
				if (isEmpty(subNodes)) {
					continue;
				}
				nodes.push(...subNodes);
			}
		}
		return nodes;
	}

	// In my case, adjacent depends on the coordinates... e.g. 0,0 has 0,1 and 1,0
	getConfig() {
		const Tiles: IGameTileMeta[] = [];
		const Items: IGameItemConfig[] = [];
		const Enemies: IGameEnemyConfig[] = [];
		for (const cell of this.cells) {
			cell.getConfig({
				Tiles,
				Items,
				Enemies,
			});
		}
		return {
			X: this.X,
			Y: this.Y,
			Name: this.Name,
			GroundColor: getNameById(WorldColors, this.GroundColor),
			AccentColor: getNameById(WorldColors, this.AccentColor),
			Tiles,
			Items,
			Enemies,
		};
	}
}
