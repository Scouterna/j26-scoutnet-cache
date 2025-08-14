export const troopTypeByNumber: Record<number, TroopType> = {
	1: 'beaver',
	2: 'tracker',
	3: 'discoverer',
	4: 'adventurer',
	5: 'challenger',
	6: 'rover',
	7: 'other',
	8: 'family',
};

export const troopTypeByString = {
	beaver: 1,
	tracker: 2,
	discoverer: 3,
	adventurer: 4,
	challenger: 5,
	rover: 6,
	other: 7,
	family: 8,
} as const;

export type TroopType = keyof typeof troopTypeByString;

export const groupTypeByNumber: Record<number, GroupType> = {
	1: 'regular',
	2: 'sea',
	3: 'hub',
};

export const groupTypeByString = {
	regular: 1,
	sea: 2,
	hub: 3,
} as const;

export type GroupType = keyof typeof groupTypeByString;
