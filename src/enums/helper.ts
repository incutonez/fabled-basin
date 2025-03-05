import { type IOption } from "@incutonez/core-ui/types";

export const HasAPI = import.meta.env.MODE !== "GitHubPages";

export function findRecord(enums: IOption[], value?: string | number) {
	return enums.find((record) => record.id === value);
}

export function findRecordByName(enums: IOption[], value?: string | number) {
	return enums.find((record) => record.name === value);
}

export function getIdByName(enums: IOption[], value?: string | number) {
	return findRecordByName(enums, value)?.id;
}

export function getNameById(enums: IOption[], value?: string | number) {
	return findRecord(enums, value)?.name;
}
