import "reflect-metadata";
import { IViewModel } from "@incutonez/core-ui/types";
import { getObjectValue, isEmpty, isObject } from "@incutonez/core-ui/utils";
import { ClassTransformOptions, plainToInstance } from "class-transformer";
import { validateSync, ValidationError, ValidatorOptions } from "class-validator";
import { unset } from "lodash-es";

export interface IModelGetOptions extends ClassTransformOptions {
	exclude?: string[];
}

export interface IModelOptions {
	init?: boolean;
	[IsNew]?: boolean;
	[Parent]?: unknown;
}

export const IsNew = Symbol("isNew");

export const IsModel = Symbol("isModel");

export const Parent = Symbol("parent");

export const Errors = Symbol("Errors");

const Visited = Symbol("visited");
const LastKeyRegex = /\.(?=[^.]+$)/;

function isModel(value: unknown): value is ViewModel {
	return (value as ViewModel)?.[IsModel];
}

function getValue(item: unknown, options: IModelGetOptions): unknown {
	if (isModel(item)) {
		return item.get(options);
	}
	else if (Array.isArray(item)) {
		return item.map((subItem) => getValue(subItem, options));
	}
	// If we're dealing with a plain old object, just clone it the old fashion way
	else if (isObject(item)) {
		return JSON.parse(JSON.stringify(item));
	}
	return item;
}

// TODOJEF: Add Dirty flag and ability to reset to non-dirty state with a snapshot?
export class ViewModel {
	static [IsModel] = true;
	[IsNew] = true;
	[IsModel] = true;
	[Parent]?: unknown;
	[Visited]?: boolean;
	[Errors]: ValidationError[] = [];

	static create<T extends ViewModel>(this: new () => T, data = {} as Partial<IViewModel<T>>, options: IModelOptions = {}) {
		const record = new this();
		record.set(data);
		if (options.init) {
			record.init();
		}
		record[IsNew] = options[IsNew] ?? true;
		record[Parent] = options[Parent];
		return record;
	}

	/**
	 * @abstract
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	init(_data?: Partial<IViewModel<this>>) {
	}

	isValid(options?: ValidatorOptions) {
		options ??= {};
		if (!("stopAtFirstError" in options)) {
			options.stopAtFirstError = true;
		}
		this.validate(options);
		return isEmpty(this[Errors]);
	}

	validate(options?: ValidatorOptions) {
		if (!this[Visited]) {
			this[Visited] = true;
			for (const key in this) {
				const value = this[key] as ViewModel | ViewModel[];
				if (Array.isArray(value)) {
					value.forEach((item) => {
						if (item?.[IsModel]) {
							item.validate(options);
						}
					});
				}
				else if (value?.[IsModel]) {
					value.validate(options);
				}
			}
			this[Errors] = validateSync(this, options);
			delete this[Visited];
		}
	}

	get<T = unknown>(options: IModelGetOptions = {}) {
		const data = {};
		if (!this[Visited]) {
			options.ignoreDecorators = true;
			const { exclude = [] } = options;
			this[Visited] = true;
			for (const key in this) {
				const item = this[key];
				Reflect.set(data, key, getValue(item, options));
			}
			exclude.forEach((field) => {
				if (field.includes(".")) {
					const [parentKey, key] = field.split(LastKeyRegex);
					const value = getObjectValue(data, parentKey);
					if (Array.isArray(value)) {
						for (let i = value.length - 1; i >= 0; i--) {
							const item = value[i];
							delete item[key];
							// If our object is now empty because that was the last property, let's just remove it from the array
							if (isEmpty(item)) {
								value.splice(i, 1);
							}
						}
					}
					// TODOJEF: What about Set/Map?
					else if (isObject(value)) {
						delete value[key as keyof typeof value];
					}
					// If our object is now empty because that was the last property, let's just remove it from the array
					if (isEmpty(value)) {
						// TODOJEF: Figure out how to do this without lodash
						unset(data, parentKey);
					}
				}
				else {
					delete data[field as keyof typeof data];
				}
			});
			delete this[Visited];
		}
		return data as T;
	}

	set(data: Partial<IViewModel<this>>) {
		const values = plainToInstance(this.constructor as new () => this, data);
		for (const key in values) {
			const value = values[key];
			if ((value as ViewModel)?.[IsModel]) {
				(value as ViewModel)[Parent] = this;
			}
			else if (Array.isArray(value)) {
				value.forEach((item) => {
					if ((item as ViewModel)?.[IsModel]) {
						(item as ViewModel)[Parent] = this;
					}
				});
			}
			Reflect.set(this, key, values[key]);
		}
	}

	clone({ options, getOptions }: {options?: IModelOptions, getOptions?: IModelGetOptions} = {}) {
		return (this.constructor as typeof ViewModel).create(this.get(getOptions), options) as typeof this;
	}

	clear() {
		for (const key in this) {
			Reflect.set(this, key, null);
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async create(_params?: unknown): Promise<unknown> {
		throw Error("Method not implemented");
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async read(_params?: unknown): Promise<unknown> {
		throw Error("Method not implemented");
	}

	static _readAll<T extends object>(response: T): T {
		let records: unknown[] = [];
		const genericResponse = "data" in response;
		const data = genericResponse ? response.data : response;
		if (data) {
			records = (data as ViewModel[]).map((item) => {
				if (item[IsModel]) {
					return item;
				}
				return this.create(item);
			});
		}
		if (genericResponse) {
			(response.data as unknown[]) = records;
			return response;
		}
		return records as T;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async update(_params?: unknown): Promise<unknown> {
		throw Error("Method not implemented");
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async delete(_params?: unknown): Promise<unknown> {
		throw Error("Method not implemented");
	}

	async load(params?: unknown) {
		const data = await this.read(params);
		this[IsNew] = false;
		this.set(data as IViewModel<this>);
	}

	async save(params?: unknown) {
		const data = this[IsNew] ? await this.create(params) : await this.update(params);
		this[IsNew] = false;
		this.set(data as IViewModel<this>);
	}
}
