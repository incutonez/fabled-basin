import { IGameEnum } from "@/types/common.ts";

export const AnimationsActionUp: IGameEnum = {
	displayName: "Action Up",
	name: "ActionUp",
	id: 0,
};

export const AnimationsActionDown: IGameEnum = {
	displayName: "Action Down",
	name: "ActionDown",
	id: 1,
};

export const AnimationsActionRight: IGameEnum = {
	displayName: "Action Right",
	name: "ActionRight",
	id: 2,
};

export const AnimationsActionLeft: IGameEnum = {
	displayName: "Action Left",
	name: "ActionLeft",
	id: 3,
};

export const AnimationsEntering: IGameEnum = {
	displayName: "Entering",
	name: "Entering",
	id: 4,
};

export const AnimationsExiting: IGameEnum = {
	displayName: "Exiting",
	name: "Exiting",
	id: 5,
};

export const AnimationsIdleUp: IGameEnum = {
	displayName: "Idle Up",
	name: "IdleUp",
	id: 6,
};

export const AnimationsIdleDown: IGameEnum = {
	displayName: "Idle Down",
	name: "IdleDown",
	id: 7,
};

export const AnimationsIdleRight: IGameEnum = {
	displayName: "Idle Right",
	name: "IdleRight",
	id: 8,
};

export const AnimationsIdleLeft: IGameEnum = {
	displayName: "Idle Left",
	name: "IdleLeft",
	id: 9,
};

export const AnimationsWalkUp: IGameEnum = {
	displayName: "Walk Up",
	name: "WalkUp",
	id: 10,
};

export const AnimationsWalkDown: IGameEnum = {
	displayName: "Walk Down",
	name: "WalkDown",
	id: 11,
};

export const AnimationsWalkRight: IGameEnum = {
	displayName: "Walk Right",
	name: "WalkRight",
	id: 12,
};

export const AnimationsWalkLeft: IGameEnum = {
	displayName: "Walk Left",
	name: "WalkLeft",
	id: 13,
};

export const Animations: IGameEnum[] = [
	AnimationsActionUp,
	AnimationsActionDown,
	AnimationsActionRight,
	AnimationsActionLeft,
	AnimationsEntering,
	AnimationsExiting,
	AnimationsIdleUp,
	AnimationsIdleDown,
	AnimationsIdleRight,
	AnimationsIdleLeft,
	AnimationsWalkUp,
	AnimationsWalkDown,
	AnimationsWalkRight,
	AnimationsWalkLeft,
];
