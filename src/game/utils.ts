import CanvasTexture = Phaser.Textures.CanvasTexture;

export interface IReplaceColors {
	colors: {
		target: string;
		value: string;
	}[];
	image: HTMLImageElement;
	texture: CanvasTexture;
	frame: number;
}

const HexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

export function toInt(value: string, radix = 10) {
	return parseInt(value, radix);
}

function hexToRgb(hex = "") {
	const result = HexRegex.exec(hex) ?? [];
	return {
		red: toInt(result[1], 16) ?? 0,
		green: toInt(result[2], 16) ?? 0,
		blue: toInt(result[3], 16) ?? 0,
	};
}

export function replaceColors({ colors = [], image, texture, frame }: IReplaceColors) {
	const ctx = texture.context;
	if (ctx && image) {
		const w = 16;
		const h = 16;
		let spacingX = 0;
		let spacingY = 0;
		const modifierX = frame % 10;
		const modifierY = Math.floor(frame / 10);
		if (modifierX) {
			spacingX = 4;
		}
		if (modifierY) {
			spacingY = 4;
		}
		/* The 2nd and 3rd params are the coords into the original spritesheet... the location of where our actual
         * sprite starts.  The max horizontal frames is 9 and vertical is 6, so we have to mod these */
		ctx.drawImage(image, 16 * modifierX + spacingX * modifierX, 16 * modifierY + spacingY * modifierY, w, h, 0, 0, w, h);
		const imageData = ctx.getImageData(0, 0, w, h);
		const { data } = imageData;
		for (let i = 0; i < data.length; i += 4) {
			let found = false;
			for (const color of colors) {
				/* Return if we've already found the color we've replaced... otherwise, we could possibly be replacing
		         * the color we just replaced if they chose that same color... */
				if (found || !color.value) {
					continue;
				}
				const { red, green, blue } = hexToRgb(color.value);
				const { red: redTarget, blue: blueTarget, green: greenTarget } = hexToRgb(color.target);
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
		texture.refresh();
	}
}
