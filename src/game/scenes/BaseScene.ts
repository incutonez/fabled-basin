import { Scene } from "phaser";
import Player from "@/game/prefabs/Player.ts";
import { PlayerState } from "@/game/prefabs/PlayerState.ts";

export class BaseScene extends Scene {
    playerState: PlayerState;
    player: Player;
    x: number;
    y: number;
    name?: string;

    get Name() {
    	const { name, x, y } = this;
    	return name ?? `${x}${y}`;
    }
}
