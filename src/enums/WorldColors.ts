export const WorldColorsNone = {
	displayName: "None",
	name: "None",
	id: "Transparent",
} as const;

export const WorldColorsBlack = {
	displayName: "Black",
	name: "Black",
	id: "000000",
} as const;

export const WorldColorsBlue = {
	displayName: "Blue",
	name: "Blue",
	id: "0000bc",
} as const;

export const WorldColorsBlueLight = {
	displayName: "Blue Light",
	name: "BlueLight",
	id: "6888ff",
} as const;

export const WorldColorsBluePure = {
	displayName: "Blue Pure",
	name: "BluePure",
	id: "0000FF",
} as const;

export const WorldColorsBlueWater = {
	displayName: "Blue Water",
	name: "BlueWater",
	id: "2038ec",
} as const;

export const WorldColorsBrown = {
	displayName: "Brown",
	name: "Brown",
	id: "c84c0c",
} as const;

export const WorldColorsBrownButter = {
	displayName: "Brown Butter",
	name: "BrownButter",
	id: "ac7c00",
} as const;

export const WorldColorsBrownDark = {
	displayName: "Brown Dark",
	name: "BrownDark",
	id: "503000",
} as const;

export const WorldColorsBrownLight = {
	displayName: "Brown Light",
	name: "BrownLight",
	id: "f8b800",
} as const;

export const WorldColorsGray = {
	displayName: "Gray",
	name: "Gray",
	id: "7c7c7c",
} as const;

export const WorldColorsGreen = {
	displayName: "Green",
	name: "Green",
	id: "00a800",
} as const;

export const WorldColorsGreenDark = {
	displayName: "Green Dark",
	name: "GreenDark",
	id: "005800",
} as const;

export const WorldColorsGreenLight = {
	displayName: "Green Light",
	name: "GreenLight",
	id: "58f898",
} as const;

export const WorldColorsGreenPure = {
	displayName: "Green Pure",
	name: "GreenPure",
	id: "00FF00",
} as const;

export const WorldColorsLime = {
	displayName: "Lime",
	name: "Lime",
	id: "b8f818",
} as const;

export const WorldColorsOrange = {
	displayName: "Orange",
	name: "Orange",
	id: "FFA044",
} as const;

export const WorldColorsOrangeDark = {
	displayName: "Orange Dark",
	name: "OrangeDark",
	id: "e45c10",
} as const;

export const WorldColorsPeach = {
	displayName: "Peach",
	name: "Peach",
	id: "fcd8a8",
} as const;

export const WorldColorsPurpleLight = {
	displayName: "Purple Light",
	name: "PurpleLight",
	id: "b8b8f8",
} as const;

export const WorldColorsQ1C1Accent = {
	displayName: "Q 1 C 1 Accent",
	name: "Q1C1Accent",
	id: "008088",
} as const;

export const WorldColorsQ1C1Door = {
	displayName: "Q 1 C 1 Door",
	name: "Q1C1Door",
	id: "183c5c",
} as const;

export const WorldColorsRed = {
	displayName: "Red",
	name: "Red",
	id: "F83800",
} as const;

export const WorldColorsRedPure = {
	displayName: "Red Pure",
	name: "RedPure",
	id: "FF0000",
} as const;

export const WorldColorsTan = {
	displayName: "Tan",
	name: "Tan",
	id: "FFEFA6",
} as const;

export const WorldColorsTeal = {
	displayName: "Teal",
	name: "Teal",
	id: "008888",
} as const;

export const WorldColorsTealLight = {
	displayName: "Teal Light",
	name: "TealLight",
	id: "00e8d8",
} as const;

export const WorldColorsTealDark = {
	displayName: "Teal Dark",
	name: "TealDark",
	id: "004058",
} as const;

export const WorldColorsWhite = {
	displayName: "White",
	name: "White",
	id: "fcfcfc",
} as const;

export const WorldColorsWhitePure = {
	displayName: "White Pure",
	name: "WhitePure",
	id: "FFFFFF",
} as const;

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
