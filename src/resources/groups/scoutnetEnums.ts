const troopTypeByNumber = {
	1: 'beaver',
	2: 'tracker',
	3: 'discoverer',
	4: 'adventurer',
	5: 'challenger',
	6: 'rover',
	7: 'other',
	8: 'family',
} as const;

export type TroopType =
	(typeof troopTypeByNumber)[keyof typeof troopTypeByNumber];

export function parseTroopType(type: number): TroopType | null {
	return troopTypeByNumber[type as keyof typeof troopTypeByNumber] ?? null;
}

export function parseAndFilterTroopTypes(types: number[]) {
	return types.map(parseTroopType).filter((type) => type != null);
}

export const groupTypeByNumber = {
	1: 'regular',
	2: 'sea',
	3: 'hub',
} as const;

export type GroupType =
	(typeof groupTypeByNumber)[keyof typeof groupTypeByNumber];

export function parseGroupType(type: number): GroupType | null {
	return groupTypeByNumber[type as keyof typeof groupTypeByNumber] ?? null;
}

export function parseAndFilterGroupTypes(types: number[]) {
	return types.map(parseGroupType).filter((type) => type != null);
}
