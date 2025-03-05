import { inject, InjectionKey, provide, ref } from "vue";
import { GameScreen } from "@/models/GameScreen";
import { GameWorld } from "@/models/GameWorld";

export type TProvideWorldConfig = ReturnType<typeof provideWorldConfig>;

export const WorldConfigKey: InjectionKey<TProvideWorldConfig> = Symbol("worldConfig");

export function provideWorldConfig() {
	const worldRecord = ref<GameWorld>();
	const screenRecord = ref<GameScreen>();
	const provider = {
		worldRecord,
		screenRecord,
	};

	provide(WorldConfigKey, provider);

	return provider;
}

export function injectWorldConfig() {
	return inject(WorldConfigKey) as TProvideWorldConfig;
}
