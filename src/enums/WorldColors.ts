import { IGameEnum } from "@/types/common.ts";

export const WorldColorsNone: IGameEnum = {
	displayName: "None",
	name: "None",
	id: "Transparent",
};

export const WorldColorsBlack: IGameEnum = {
	displayName: "Black",
	name: "Black",
	id: "000000",
};

export const WorldColorsBlue: IGameEnum = {
	displayName: "Blue",
	name: "Blue",
	id: "0000bc",
};

export const WorldColorsBlueLight: IGameEnum = {
	displayName: "Blue Light",
	name: "BlueLight",
	id: "6888ff",
};

export const WorldColorsBluePure: IGameEnum = {
	displayName: "Blue Pure",
	name: "BluePure",
	id: "0000FF",
};

export const WorldColorsBlueWater: IGameEnum = {
	displayName: "Blue Water",
	name: "BlueWater",
	id: "2038ec",
};

export const WorldColorsBrown: IGameEnum = {
	displayName: "Brown",
	name: "Brown",
	id: "c84c0c",
};

export const WorldColorsBrownButter: IGameEnum = {
	displayName: "Brown Butter",
	name: "BrownButter",
	id: "ac7c00",
};

export const WorldColorsBrownDark: IGameEnum = {
	displayName: "Brown Dark",
	name: "BrownDark",
	id: "503000",
};

export const WorldColorsBrownLight: IGameEnum = {
	displayName: "Brown Light",
	name: "BrownLight",
	id: "f8b800",
};

export const WorldColorsGray: IGameEnum = {
	displayName: "Gray",
	name: "Gray",
	id: "7c7c7c",
};

export const WorldColorsGreen: IGameEnum = {
	displayName: "Green",
	name: "Green",
	id: "00a800",
};

export const WorldColorsGreenDark: IGameEnum = {
	displayName: "Green Dark",
	name: "GreenDark",
	id: "005800",
};

export const WorldColorsGreenLight: IGameEnum = {
	displayName: "Green Light",
	name: "GreenLight",
	id: "58f898",
};

export const WorldColorsGreenPure: IGameEnum = {
	displayName: "Green Pure",
	name: "GreenPure",
	id: "00FF00",
};

export const WorldColorsLime: IGameEnum = {
	displayName: "Lime",
	name: "Lime",
	id: "b8f818",
};

export const WorldColorsOrange: IGameEnum = {
	displayName: "Orange",
	name: "Orange",
	id: "FFA044",
};

export const WorldColorsOrangeDark: IGameEnum = {
	displayName: "Orange Dark",
	name: "OrangeDark",
	id: "e45c10",
};

export const WorldColorsPeach: IGameEnum = {
	displayName: "Peach",
	name: "Peach",
	id: "fcd8a8",
};

export const WorldColorsPurpleLight: IGameEnum = {
	displayName: "Purple Light",
	name: "PurpleLight",
	id: "b8b8f8",
};

export const WorldColorsQ1C1Accent: IGameEnum = {
	displayName: "Q 1 C 1 Accent",
	name: "Q1C1Accent",
	id: "008088",
};

export const WorldColorsQ1C1Door: IGameEnum = {
	displayName: "Q 1 C 1 Door",
	name: "Q1C1Door",
	id: "183c5c",
};

export const WorldColorsRed: IGameEnum = {
	displayName: "Red",
	name: "Red",
	id: "F83800",
};

export const WorldColorsRedPure: IGameEnum = {
	displayName: "Red Pure",
	name: "RedPure",
	id: "FF0000",
};

export const WorldColorsTan: IGameEnum = {
	displayName: "Tan",
	name: "Tan",
	id: "FFEFA6",
};

export const WorldColorsTeal: IGameEnum = {
	displayName: "Teal",
	name: "Teal",
	id: "008888",
};

export const WorldColorsTealLight: IGameEnum = {
	displayName: "Teal Light",
	name: "TealLight",
	id: "00e8d8",
};

export const WorldColorsTealDark: IGameEnum = {
	displayName: "Teal Dark",
	name: "TealDark",
	id: "004058",
};

export const WorldColorsWhite: IGameEnum = {
	displayName: "White",
	name: "White",
	id: "fcfcfc",
};

export const WorldColorsWhitePure: IGameEnum = {
	displayName: "White Pure",
	name: "WhitePure",
	id: "FFFFFF",
};

export const WorldColors: IGameEnum[] = [
	WorldColorsNone,
	WorldColorsBlack,
	WorldColorsBlue,
	WorldColorsBlueLight,
	WorldColorsBluePure,
	WorldColorsBlueWater,
	WorldColorsBrown,
	WorldColorsBrownButter,
	WorldColorsBrownDark,
	WorldColorsBrownLight,
	WorldColorsGray,
	WorldColorsGreen,
	WorldColorsGreenDark,
	WorldColorsGreenLight,
	WorldColorsGreenPure,
	WorldColorsLime,
	WorldColorsOrange,
	WorldColorsOrangeDark,
	WorldColorsPeach,
	WorldColorsPurpleLight,
	WorldColorsQ1C1Accent,
	WorldColorsQ1C1Door,
	WorldColorsRed,
	WorldColorsRedPure,
	WorldColorsTan,
	WorldColorsTeal,
	WorldColorsTealLight,
	WorldColorsTealDark,
	WorldColorsWhite,
	WorldColorsWhitePure,
];

export type TWorldColors = typeof WorldColors[number]["name"];
