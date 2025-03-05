import { IsObject } from "class-validator";
import { ModelInterface, ViewModel } from "@/models/ViewModel";
import { type IGameEnum } from "@/types/common";

export type IGameTargetColor = ModelInterface<GameTargetColor>;

export class GameTargetColor extends ViewModel {
  @IsObject()
  Target: IGameEnum = {};

  @IsObject()
  Value?: IGameEnum = {};

  getConfig() {
  	const { Target, Value } = this;
  	if (Target === Value || !Value) {
  		return;
  	}
  	return [Target.name, Value.name] as string[];
  }
}
