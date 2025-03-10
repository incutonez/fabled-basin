import { IsBoolean, IsNotEmpty, IsNotEmptyObject, IsString } from "class-validator";
import { GameScreen } from "@/models/GameScreen";
import { Parent, ViewModel } from "@/models/ViewModel";

interface IWorldSpawn {
	SceneX: number;
	SceneY: number;
	X?: number;
	Y?: number;
	Name?: string;
}

export class GameWorld extends ViewModel {
	@IsString()
	@IsNotEmpty()
	Name = "";

	@IsNotEmptyObject()
	Spawn: IWorldSpawn = {
		SceneX: 112,
		SceneY: 88,
	};

	Children: GameScreen[] = [];

	@IsBoolean()
	IsInitialWorld = false;

	[Parent]: GameWorld[] = [];

	set initialWorld(value) {
		if (value) {
			// If we're setting this world as the initial one, then we need to loop through and unset any others
			this[Parent].forEach((child) => {
				if (child !== this) {
					child.initialWorld = false;
				}
			});
		}
		this.IsInitialWorld = value;
	}

	get initialWorld() {
		return this.IsInitialWorld;
	}

	getConfig() {
		const { IsInitialWorld } = this;
		return {
			Name: this.Name,
			Spawn: this.Spawn,
			IsInitialWorld: IsInitialWorld ? true : undefined,
			Children: this.Children.map((child) => child.getConfig()),
		};
	}
}
