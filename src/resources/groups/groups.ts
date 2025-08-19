import { createAuthorizationHeader } from '@scouterna/scoutnet';
import config from '../../config.ts';
import { scoutnet } from '../../scoutnet.ts';
import { parseAndFilterGroupTypes, parseTroopType } from './scoutnetEnums.ts';
import type { GroupOrSection } from './types.ts';

let groups: GroupOrSection[] = [];
let lastFetchedAt: Date = new Date(0);
let nextFetchAt: Date = new Date(0);

const maxAge: number = 60 * 60 * 1000; // 1 hour

async function getGroups() {
	const cacheStale = nextFetchAt.getTime() < Date.now();

	if (cacheStale || groups.length === 0) {
		await refreshCache();
	}

	return {
		lastFetchedAt: lastFetchedAt,
		nextFetchAt: nextFetchAt,
		groups: groups,
	};
}

async function refreshCache() {
	const groupsResponse = await fetchGroupsFromScoutnet();
	const allGroups = Object.values(groupsResponse).flatMap((org) =>
		Object.values(org.regions ?? {}).flatMap((region) =>
			Object.values(region.districts ?? {}).flatMap((district) =>
				Object.values(district.groups ?? {}),
			),
		),
	);

	// Clear the existing groups array
	groups = [];

	for (const group of allGroups) {
		const groupTypes = parseAndFilterGroupTypes(group.group_types ?? []);
		const isHub = groupTypes.includes('hub');

		// In the case of a hub, account for sections. Otherwise pretend they're not there.
		const sections = isHub ? Object.values(group.sections ?? {}) : [];
		const sectionIds = sections.map((section) => section.id);

		const troops = Object.entries(group.troops ?? {});

		// Exclude section troops from the main group
		const troopsWithoutSections = troops.filter(
			([_, troop]) => !sectionIds.includes(troop.section_id),
		);

		groups.push({
			id: `group:${group.group_no}`,
			name: group.name ?? null,
			types: groupTypes,
			belongsToGroup: null,
			troops: troopsWithoutSections.map(([id, troop]) => ({
				id,
				name: troop.name,
				type: parseTroopType(troop.type) ?? 'other',
			})),
		});

		// Add the sections as their own groups
		for (const section of sections) {
			const sectionTroops = troops.filter(
				([_, troop]) => troop.section_id === section.id,
			);
			// Give the section the same types as the group, but exclude 'hub'
			const sectionTypes = groupTypes.filter((type) => type !== 'hub');

			groups.push({
				id: `section:${section.id}`,
				name: section.name,
				belongsToGroup: `group:${group.group_no}`,
				types: sectionTypes,
				troops: sectionTroops.map(([id, troop]) => ({
					id,
					name: troop.name,
					type: parseTroopType(troop.type) ?? 'other',
				})),
			});
		}
	}

	lastFetchedAt = new Date();
	nextFetchAt = new Date(lastFetchedAt.getTime() + maxAge);
}

async function fetchGroupsFromScoutnet() {
	const response = await scoutnet.GET('/project/get/groups', {
		headers: {
			Authorization: createAuthorizationHeader({
				resourceId: config.SCOUTNET_PROJECT_ID,
				key: config.SCOUTNET_GROUPS_API_KEY,
			}),
		},
	});

	if (response.error) {
		throw new Error('Failed to fetch groups', {
			cause: response.error,
		});
	}

	if (!response.data) {
		throw new Error('No data received from groups API');
	}

	return response.data;
}

export { getGroups, refreshCache };
