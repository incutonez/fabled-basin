import { isEmpty } from "@incutonez/core-ui/utils";
// @ts-expect-error This isn't exported with a declaration file
import { defaultMetadataStorage } from "class-transformer/esm5/storage";
import { TransformOptions } from "class-transformer/types/interfaces";
import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";
import { ViewModel } from "@/models/ViewModel";

export function IsRequired(validationOptions?: ValidationOptions) {
	return function(object: object, propertyName: string) {
		registerDecorator({
			name: "IsRequired",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				defaultMessage(args: ValidationArguments) {
					return `${args.property} is required`;
				},
				validate(value: unknown) {
					return typeof value !== "number" && isEmpty(value);
				},
			},
		});
	};
}

// Idea taken from https://github.com/typestack/class-transformer/issues/563#issue-788919461
export function ModelTransform(cls: () => typeof ViewModel, options?: TransformOptions): PropertyDecorator {
	options ??= {};
	options.toClassOnly = true;
	return function(target: unknown, propertyName: string | symbol): void {
		defaultMetadataStorage.addTransformMetadata({
			target: target?.constructor,
			propertyName: propertyName as string,
			options,
			transformFn({ value }: { value: unknown }) {
				let output: ViewModel | ViewModel[] | undefined;
				const model = cls();
				if (value) {
					if (Array.isArray(value)) {
						output = [];
						value.forEach((item) => (output as ViewModel[]).push(model.create(item)));
					}
					else {
						output = model.create(value);
					}
				}
				return output;
			},
		});
	};
}
