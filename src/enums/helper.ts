import { IGameEnum, IGameObject } from "@/types/common.ts";

type IFindRecord = IGameEnum[] | IGameObject[]

export function findRecord(enums: IFindRecord, value?: string | number) {
	return enums.find((record) => record.id === value);
}

export function findRecordByName(enums: IFindRecord, value?: string | number) {
	return enums.find((record) => record.name === value);
}

export function getIdByName(enums: IFindRecord, value?: string | number) {
	return findRecordByName(enums, value)?.id;
}

export function getNameById(enums: IFindRecord, value?: string | number) {
	return findRecord(enums, value)?.name;
}
