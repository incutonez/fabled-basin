import { Items } from "@/enums/Items";
import { GameTileCell } from "@/models/GameTileCell";
import { GameWorldObject, IGameWorldObjectConfig } from "@/models/GameWorldObject";

export interface IGameItemConfig extends IGameWorldObjectConfig {
	Config: {
		Type?: string;
	}
}

export class GameItem extends GameWorldObject {
	/* TODO: Potentially implement colors that can change for the items, but that would involve
   * genericizing the items.png asset to have colors that are common */

	get enumCollection() {
		return Items;
	}

	get imageType() {
		return "Items";
	}

	getConfig(): IGameItemConfig {
		const { cell = GameTileCell.create() } = this;
		const itemType = this.getTypeKey();
		return {
			X: cell.x,
			Y: cell.y,
			Config: {
				Type: itemType,
			},
		};
	}

	setDefaultValues() {
		this.Colors = [];
	}
}
