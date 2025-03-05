import { toInt } from "@incutonez/core-ui/utils";
import { GameTargetColor } from "@/models/GameTargetColor";
import { IGameEnum } from "@/types/common.ts";

const ImageCache: Record<string, HTMLImageElement> = {};

interface IReplaceColors {
	imageEnum: IGameEnum;
	colors: GameTargetColor[];
}

const canvas = document.createElement("canvas");
const HexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

function hexToRgb(hex = "") {
	const result = HexRegex.exec(hex) ?? [];
	return {
		red: toInt(result[1], 16) ?? 0,
		green: toInt(result[2], 16) ?? 0,
		blue: toInt(result[3], 16) ?? 0,
	};
}

export async function replaceColors({ colors = [], imageEnum }: IReplaceColors) {
	const ctx = canvas.getContext("2d");
	const image = await loadImage(imageEnum.name, imageEnum.imageSrc);
	if (ctx && image) {
		const w = image.naturalWidth;
		const h = image.naturalHeight;
		canvas.height = h;
		canvas.width = w;
		ctx.drawImage(image, 0, 0, w, h);
		const imageData = ctx.getImageData(0, 0, w, h);
		const { data } = imageData;
		for (let i = 0; i < data.length; i += 4) {
			let found = false;
			for (const color of colors) {
				/* Return if we've already found the color we've replaced... otherwise, we could possibly be replacing
				 * the color we just replaced if they chose that same color... */
				if (found || !color.Value?.id) {
					continue;
				}
				const { red, green, blue } = hexToRgb(color.Value.id as string);
				const { red: redTarget, blue: blueTarget, green: greenTarget } = hexToRgb(color.Target.id as string);
				// is this pixel the old rgb?
				if (data[i] === redTarget &&
					data[i + 1] === greenTarget &&
					data[i + 2] === blueTarget
				) {
					// change to your new rgb
					data[i] = red;
					data[i + 1] = green;
					data[i + 2] = blue;
					found = true;
				}
			}
		}
		ctx.putImageData(imageData, 0, 0);
		return canvas.toDataURL("image/png");
	}
}

export async function loadImage(key?: string, src?: string): Promise<HTMLImageElement | undefined> {
	if (!key || !src) {
		return;
	}
	if (ImageCache[key]) {
		return ImageCache[key];
	}
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.onload = () => {
			resolve(ImageCache[key]);
		};
		image.onerror = () => {
			reject();
		};
		image.src = src;
		ImageCache[key] = image;
	});
}
