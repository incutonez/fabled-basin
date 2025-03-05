import { isEmpty } from "@incutonez/core-ui/utils";
import { IsNumber } from "class-validator";
import {
	Enemies,
	EnemiesArmos,
	EnemiesBubble,
	EnemiesBubbleBlue,
	EnemiesBubbleRed,
	EnemiesDarknut,
	EnemiesDarknutBlue,
	EnemiesGel,
	EnemiesGelBlue,
	EnemiesGhini,
	EnemiesGibdo,
	EnemiesGoriya,
	EnemiesGoriyaBlue,
	EnemiesKeese,
	EnemiesKeeseBlue,
	EnemiesKeeseRed,
	EnemiesLanmola,
	EnemiesLanmolaBlue,
	EnemiesLeever,
	EnemiesLeeverBlue,
	EnemiesLikeLike,
	EnemiesLynel,
	EnemiesLynelBlue,
	EnemiesMoblin,
	EnemiesMoblinBlue,
	EnemiesMoldorm,
	EnemiesMoldormBlue,
	EnemiesOctorok,
	EnemiesOctorokBlue,
	EnemiesPatra,
	EnemiesPatraHead,
	EnemiesPeahat,
	EnemiesPolsVoice,
	EnemiesRock,
	EnemiesRope,
	EnemiesRopeBlue,
	EnemiesStalfos,
	EnemiesTektite,
	EnemiesTektiteBlue,
	EnemiesTrap,
	EnemiesVire,
	EnemiesWallmaster,
	EnemiesWizzrobe,
	EnemiesWizzrobeBlue,
	EnemiesZol, EnemiesZolGray, EnemiesZolGreen, EnemiesZora,
} from "@/enums/NPCs";
import {
	WorldColorsBlack,
	WorldColorsBlue,
	WorldColorsBlueLight,
	WorldColorsGray, WorldColorsGreenDark, WorldColorsGreenLight,
	WorldColorsLime,
	WorldColorsOrange,
	WorldColorsRed,
	WorldColorsRedPure,
	WorldColorsTeal,
	WorldColorsTealDark,
	WorldColorsTealLight,
	WorldColorsWhitePure,
} from "@/enums/WorldColors";
import { GameTargetColor, IGameTargetColor } from "@/models/GameTargetColor";
import { GameTileCell } from "@/models/GameTileCell";
import { GameWorldObject, IGameWorldObjectConfig } from "@/models/GameWorldObject";

const WhiteBlack = [WorldColorsWhitePure, WorldColorsBlack];
const WhiteBlackRed = [WorldColorsWhitePure, WorldColorsBlack, WorldColorsRedPure];
/**
 * For the most part, the coloring is by having 2 different color palettes...
 * a red/orange for the standard version, and blue/light blue for the harder version of the enemy.
 */
const EnemyNormal = WhiteBlackRed.map((color) => {
	const config: IGameTargetColor = {
		Target: color,
	};
	if (color === WorldColorsRedPure) {
		config.Value = WorldColorsRed;
	}
	else if (color === WorldColorsBlack) {
		config.Value = WorldColorsOrange;
	}
	return config;
});
const EnemyHard = WhiteBlackRed.map((color) => {
	const config: IGameTargetColor = {
		Target: color,
	};
	if (color === WorldColorsRedPure) {
		config.Value = WorldColorsBlue;
	}
	else if (color === WorldColorsBlack) {
		config.Value = WorldColorsBlueLight;
	}
	return config;
});
/* PolsVoice is a little more unique, as its RedPure color actually changes based on the suit that
 * Link is wearing... e.g.
 * Green Ring = Lime (default)
 * Blue Ring = PurpleLight
 * Red Ring = Red */
const PolsVoice = WhiteBlackRed.map((color) => {
	const config: IGameTargetColor = {
		Target: color,
	};
	if (color === WorldColorsBlack) {
		config.Value = WorldColorsRed;
	}
	else if (color === WorldColorsWhitePure) {
		config.Value = WorldColorsOrange;
	}
	else if (color === WorldColorsRedPure) {
		config.Value = WorldColorsLime;
	}
	return config;
});
// The harder version of the moblin has all 3 different colors instead of the standard 2 changes
const MoblinHarder = WhiteBlackRed.map((color) => {
	const config: IGameTargetColor = {
		Target: color,
	};
	if (color === WorldColorsRedPure) {
		config.Value = WorldColorsBlack;
	}
	else if (color === WorldColorsBlack) {
		config.Value = WorldColorsTeal;
	}
	else if (color === WorldColorsWhitePure) {
		config.Value = WorldColorsRed;
	}
	return config;
});
const Zora = WhiteBlack.map((color) => {
	const config: IGameTargetColor = {
		Target: color,
	};
	if (color === WorldColorsWhitePure) {
		config.Value = WorldColorsRed;
	}
	else if (color === WorldColorsBlack) {
		config.Value = WorldColorsTeal;
	}
	return config;
});
const GelBlue = WhiteBlack.map((color) => {
	const config: IGameTargetColor = {
		Target: color,
	};
	if (color === WorldColorsWhitePure) {
		config.Value = WorldColorsTealLight;
	}
	else if (color === WorldColorsBlack) {
		config.Value = WorldColorsTealDark;
	}
	return config;
});
const KeeseBlue = WhiteBlack.map((color) => {
	const config: IGameTargetColor = {
		Target: color,
	};
	if (color === WorldColorsWhitePure) {
		config.Value = WorldColorsBlueLight;
	}
	else if (color === WorldColorsBlack) {
		config.Value = WorldColorsBlue;
	}
	return config;
});
const KeeseRed = WhiteBlack.map((color) => {
	const config: IGameTargetColor = {
		Target: color,
	};
	if (color === WorldColorsWhitePure) {
		config.Value = WorldColorsOrange;
	}
	else if (color === WorldColorsBlack) {
		config.Value = WorldColorsRed;
	}
	return config;
});
const ZolGray = WhiteBlack.map((color) => {
	const config: IGameTargetColor = {
		Target: color,
	};
	if (color === WorldColorsBlack) {
		config.Value = WorldColorsGray;
	}
	return config;
});
const ZolGreen = WhiteBlack.map((color) => {
	const config: IGameTargetColor = {
		Target: color,
	};
	if (color === WorldColorsWhitePure) {
		config.Value = WorldColorsGreenLight;
	}
	else if (color === WorldColorsBlack) {
		config.Value = WorldColorsGreenDark;
	}
	return config;
});
const EnemyDefault = WhiteBlackRed.map((color) => {
	return {
		Target: color,
	};
});

export interface IGameEnemyConfig extends IGameWorldObjectConfig {
	Speed?: number;
	Health?: number;
	TouchDamage?: number;
	HealthModifier?: number;
	WeaponDamage?: number;
}

export class GameEnemy extends GameWorldObject {
	@IsNumber()
	Speed?: number;

	@IsNumber()
	Health?: number;

	@IsNumber()
	TouchDamage?: number;

	@IsNumber()
	HealthModifier?: number;

	@IsNumber()
	WeaponDamage?: number;

	get imageType() {
		return "Enemies";
	}

	get enumCollection() {
		return Enemies;
	}

	setDefaultValues() {
		let Health;
		let Speed;
		let TouchDamage;
		let HealthModifier;
		let WeaponDamage;
		let Colors = EnemyNormal;
		switch (this.Type) {
			case EnemiesArmos:
				Health = 6;
				TouchDamage = 1;
				Speed = 3;
				break;
			case EnemiesBubble:
				// TODO: Need to get proper colors for regular Bubble
				Health = 0;
				TouchDamage = 0;
				Speed = 3;
				break;
			case EnemiesBubbleRed:
				Health = 0;
				TouchDamage = 0;
				Speed = 3;
				break;
			case EnemiesBubbleBlue:
				Colors = EnemyHard;
				Health = 0;
				TouchDamage = 0;
				Speed = 3;
				break;
			case EnemiesDarknut:
				Health = 8;
				TouchDamage = 2;
				Speed = 3;
				break;
			case EnemiesDarknutBlue:
				Colors = EnemyHard;
				Health = 16;
				TouchDamage = 4;
				Speed = 5;
				break;
			case EnemiesGel:
				Health = 2;
				TouchDamage = 1;
				Speed = 1;
				break;
			case EnemiesGelBlue:
				Colors = GelBlue;
				Health = 2;
				TouchDamage = 1;
				Speed = 1;
				break;
			case EnemiesGhini:
				Colors = EnemyHard;
				Health = 22;
				TouchDamage = 1;
				Speed = 2;
				break;
			case EnemiesGibdo:
				Colors = EnemyHard;
				Health = 12;
				TouchDamage = 4;
				Speed = 3;
				HealthModifier = 0.75;
				break;
			case EnemiesGoriya:
				Health = 6;
				TouchDamage = 1;
				Speed = 3;
				WeaponDamage = 2;
				break;
			case EnemiesGoriyaBlue:
				Colors = EnemyHard;
				Health = 10;
				TouchDamage = 2;
				Speed = 3;
				WeaponDamage = 2;
				break;
			case EnemiesKeese:
				Health = 2;
				TouchDamage = 1;
				Speed = 4;
				break;
			case EnemiesKeeseBlue:
				Colors = KeeseBlue;
				Health = 2;
				TouchDamage = 1;
				Speed = 4;
				break;
			case EnemiesKeeseRed:
				Colors = KeeseRed;
				Health = 2;
				TouchDamage = 1;
				Speed = 4;
				break;
			case EnemiesLanmola:
				Health = 8;
				HealthModifier = 0;
				TouchDamage = 4;
				Speed = 4;
				break;
			case EnemiesLanmolaBlue:
				Colors = EnemyHard;
				Health = 8;
				HealthModifier = 0;
				TouchDamage = 4;
				Speed = 6;
				break;
			case EnemiesLeever:
				Health = 4;
				TouchDamage = 1;
				Speed = 4;
				break;
			case EnemiesLeeverBlue:
				Colors = EnemyHard;
				Health = 8;
				TouchDamage = 2;
				Speed = 4;
				break;
			case EnemiesLikeLike:
				Health = 20;
				TouchDamage = 2;
				Speed = 3;
				break;
			case EnemiesLynel:
				Health = 8;
				TouchDamage = 2;
				Speed = 3;
				WeaponDamage = 2;
				break;
			case EnemiesLynelBlue:
				Colors = EnemyHard;
				Health = 12;
				TouchDamage = 4;
				Speed = 3;
				WeaponDamage = 4;
				break;
			case EnemiesMoblin:
				Health = 4;
				TouchDamage = 1;
				Speed = 3;
				WeaponDamage = 1;
				break;
			case EnemiesMoblinBlue:
				Colors = MoblinHarder;
				Health = 6;
				TouchDamage = 1;
				Speed = 3;
				WeaponDamage = 1;
				break;
			case EnemiesMoldorm:
				Health = 10;
				HealthModifier = 0;
				TouchDamage = 1;
				Speed = 1;
				break;
				// TODO: Is there a blue Moldorm?
			case EnemiesMoldormBlue:
				Colors = EnemyHard;
				break;
			case EnemiesOctorok:
				Health = 2;
				TouchDamage = 1;
				WeaponDamage = 1;
				Speed = 3;
				break;
			case EnemiesOctorokBlue:
				Colors = EnemyHard;
				Health = 4;
				TouchDamage = 1;
				WeaponDamage = 1;
				Speed = 3;
				break;
			case EnemiesPatra:
				Colors = EnemyHard;
				Health = 20;
				TouchDamage = 4;
				Speed = 3;
				break;
			case EnemiesPatraHead:
				Health = 20;
				TouchDamage = 4;
				Speed = 3;
				break;
			case EnemiesPeahat:
				Health = 4;
				TouchDamage = 1;
				Speed = 3;
				break;
			case EnemiesPolsVoice:
				Colors = PolsVoice;
				Health = 20;
				TouchDamage = 4;
				Speed = 3;
				break;
			case EnemiesRock:
				Health = 0;
				TouchDamage = 1;
				Speed = 3;
				break;
			case EnemiesRope:
				Health = 2;
				TouchDamage = 1;
				Speed = 3;
				break;
			case EnemiesRopeBlue:
				Colors = EnemyHard;
				Health = 8;
				TouchDamage = 1;
				Speed = 3;
				break;
			case EnemiesStalfos:
				Health = 4;
				TouchDamage = 0.25;
				WeaponDamage = 0.25;
				Speed = 3;
				break;
			case EnemiesTektite:
				Health = 2;
				TouchDamage = 1;
				Speed = 3;
				break;
			case EnemiesTektiteBlue:
				Colors = EnemyHard;
				Health = 2;
				TouchDamage = 1;
				Speed = 3;
				break;
			case EnemiesTrap:
				Colors = EnemyHard;
				Health = 0;
				TouchDamage = 1;
				Speed = 3;
				break;
			case EnemiesVire:
				Colors = EnemyHard;
				Health = 2;
				TouchDamage = 2;
				Speed = 3;
				break;
			case EnemiesWallmaster:
				Colors = EnemyHard;
				Health = 6;
				TouchDamage = 1;
				Speed = 1;
				break;
			case EnemiesWizzrobe:
				Health = 6;
				TouchDamage = 2;
				WeaponDamage = 8;
				Speed = 0;
				break;
			case EnemiesWizzrobeBlue:
				Colors = EnemyHard;
				Health = 10;
				TouchDamage = 4;
				WeaponDamage = 4;
				Speed = 5;
				break;
			case EnemiesZol:
				Health = 2;
				TouchDamage = 2;
				Speed = 1;
				break;
			case EnemiesZolGray:
				Colors = ZolGray;
				Health = 2;
				TouchDamage = 2;
				Speed = 1;
				break;
			case EnemiesZolGreen:
				Colors = ZolGreen;
				Health = 2;
				TouchDamage = 2;
				Speed = 1;
				break;
			case EnemiesZora:
				Colors = Zora;
				Health = 4;
				TouchDamage = 1;
				WeaponDamage = 1;
				Speed = 0;
				break;
			default:
				Colors = EnemyDefault;
				break;
		}
		Health = this.Health ?? Health;
		HealthModifier = this.HealthModifier ?? HealthModifier;
		Speed = this.Speed ?? Speed;
		TouchDamage = this.TouchDamage ?? TouchDamage;
		WeaponDamage = this.WeaponDamage ?? WeaponDamage;
		this.Colors = Colors.map((color) => GameTargetColor.create(color));
		this.Health = Health;
		this.TouchDamage = TouchDamage;
		this.Speed = Speed;
		this.HealthModifier = HealthModifier;
		this.WeaponDamage = WeaponDamage;
	}

	getTypeKey(type = this.Type) {
		switch (type) {
			case EnemiesOctorokBlue:
				type = EnemiesOctorok;
				break;
			case EnemiesBubbleRed:
			case EnemiesBubbleBlue:
				type = EnemiesBubble;
				break;
			case EnemiesDarknutBlue:
				type = EnemiesDarknut;
				break;
			case EnemiesGelBlue:
				type = EnemiesGel;
				break;
			case EnemiesGoriyaBlue:
				type = EnemiesGoriya;
				break;
			case EnemiesKeeseBlue:
			case EnemiesKeeseRed:
				type = EnemiesKeese;
				break;
			case EnemiesLanmolaBlue:
				type = EnemiesLanmola;
				break;
			case EnemiesLeeverBlue:
				type = EnemiesLeever;
				break;
			case EnemiesLynelBlue:
				type = EnemiesLynel;
				break;
			case EnemiesMoblinBlue:
				type = EnemiesMoblin;
				break;
			case EnemiesMoldormBlue:
				type = EnemiesMoldorm;
				break;
			case EnemiesRopeBlue:
				type = EnemiesRope;
				break;
			case EnemiesTektiteBlue:
				type = EnemiesTektite;
				break;
			case EnemiesWizzrobeBlue:
				type = EnemiesWizzrobe;
				break;
			case EnemiesZolGray:
			case EnemiesZolGreen:
				type = EnemiesZol;
				break;
			default:
				break;
		}
		return super.getTypeKey(type);
	}

	// TODOJEF: Generate enemies based on the selection... e.g. if a Blue Octorok is selected,
	// the health and colors are pre-generated and that's what's used when showing the selection, but
	// the user can change the values

	getConfig() {
		const { cell = GameTileCell.create() } = this;
		const config: IGameEnemyConfig = {
			Type: this.getTypeKey(),
			X: cell.x,
			Y: cell.y,
		};
		const colors = this.getColors(true);
		if (!isEmpty(colors)) {
			config.Colors = colors as string[];
		}
		const { Speed, Health, TouchDamage, HealthModifier, WeaponDamage } = this;
		if (!isEmpty(Speed)) {
			config.Speed = Speed;
		}
		if (!isEmpty(Health)) {
			config.Health = Health;
		}
		if (!isEmpty(TouchDamage)) {
			config.TouchDamage = TouchDamage;
		}
		if (!isEmpty(HealthModifier)) {
			config.HealthModifier = HealthModifier;
		}
		if (!isEmpty(WeaponDamage)) {
			config.WeaponDamage = WeaponDamage;
		}
		return config;
	}
}
