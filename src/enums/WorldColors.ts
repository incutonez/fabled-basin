import { IWorldColor } from "@/types/common.ts";

export const WorldColorsNone = {
	displayName: "None",
	name: "None",
	id: "Transparent",
} as const satisfies IWorldColor;

export const WorldColorsBlack = {
	displayName: "Black",
	name: "Black",
	id: "000000",
} as const satisfies IWorldColor;

export const WorldColorsBlue = {
	displayName: "Blue",
	name: "Blue",
	id: "0000bc",
} as const satisfies IWorldColor;

export const WorldColorsBlueLight = {
	displayName: "Blue Light",
	name: "BlueLight",
	id: "6888ff",
} as const satisfies IWorldColor;

export const WorldColorsBluePure = {
	displayName: "Blue Pure",
	name: "BluePure",
	id: "0000FF",
} as const satisfies IWorldColor;

export const WorldColorsBlueWater = {
	displayName: "Blue Water",
	name: "BlueWater",
	id: "2038ec",
} as const satisfies IWorldColor;

export const WorldColorsBrown = {
	displayName: "Brown",
	name: "Brown",
	id: "c84c0c",
} as const satisfies IWorldColor;

export const WorldColorsBrownButter = {
	displayName: "Brown Butter",
	name: "BrownButter",
	id: "ac7c00",
} as const satisfies IWorldColor;

export const WorldColorsBrownDark = {
	displayName: "Brown Dark",
	name: "BrownDark",
	id: "503000",
} as const satisfies IWorldColor;

export const WorldColorsBrownLight = {
	displayName: "Brown Light",
	name: "BrownLight",
	id: "f8b800",
} as const satisfies IWorldColor;

export const WorldColorsGray = {
	displayName: "Gray",
	name: "Gray",
	id: "7c7c7c",
} as const satisfies IWorldColor;

export const WorldColorsGreen = {
	displayName: "Green",
	name: "Green",
	id: "00a800",
} as const satisfies IWorldColor;

export const WorldColorsGreenDark = {
	displayName: "Green Dark",
	name: "GreenDark",
	id: "005800",
} as const satisfies IWorldColor;

export const WorldColorsGreenLight = {
	displayName: "Green Light",
	name: "GreenLight",
	id: "58f898",
} as const satisfies IWorldColor;

export const WorldColorsGreenPure = {
	displayName: "Green Pure",
	name: "GreenPure",
	id: "00FF00",
} as const satisfies IWorldColor;

export const WorldColorsLime = {
	displayName: "Lime",
	name: "Lime",
	id: "b8f818",
} as const satisfies IWorldColor;

export const WorldColorsOrange = {
	displayName: "Orange",
	name: "Orange",
	id: "FFA044",
} as const satisfies IWorldColor;

export const WorldColorsOrangeDark = {
	displayName: "Orange Dark",
	name: "OrangeDark",
	id: "e45c10",
} as const satisfies IWorldColor;

export const WorldColorsPeach = {
	displayName: "Peach",
	name: "Peach",
	id: "fcd8a8",
} as const satisfies IWorldColor;

export const WorldColorsPurpleLight = {
	displayName: "Purple Light",
	name: "PurpleLight",
	id: "b8b8f8",
} as const satisfies IWorldColor;

export const WorldColorsQ1C1Accent = {
	displayName: "Q 1 C 1 Accent",
	name: "Q1C1Accent",
	id: "008088",
} as const satisfies IWorldColor;

export const WorldColorsQ1C1Door = {
	displayName: "Q 1 C 1 Door",
	name: "Q1C1Door",
	id: "183c5c",
} as const satisfies IWorldColor;

export const WorldColorsRed = {
	displayName: "Red",
	name: "Red",
	id: "F83800",
} as const satisfies IWorldColor;

export const WorldColorsRedPure = {
	displayName: "Red Pure",
	name: "RedPure",
	id: "FF0000",
} as const satisfies IWorldColor;

export const WorldColorsTan = {
	displayName: "Tan",
	name: "Tan",
	id: "FFEFA6",
} as const satisfies IWorldColor;

export const WorldColorsTeal = {
	displayName: "Teal",
	name: "Teal",
	id: "008888",
} as const satisfies IWorldColor;

export const WorldColorsTealLight = {
	displayName: "Teal Light",
	name: "TealLight",
	id: "00e8d8",
} as const satisfies IWorldColor;

export const WorldColorsTealDark = {
	displayName: "Teal Dark",
	name: "TealDark",
	id: "004058",
} as const satisfies IWorldColor;

export const WorldColorsWhite = {
	displayName: "White",
	name: "White",
	id: "fcfcfc",
} as const satisfies IWorldColor;

export const WorldColorsWhitePure = {
	displayName: "White Pure",
	name: "WhitePure",
	id: "FFFFFF",
} as const satisfies IWorldColor;

export const WorldColors = [
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
