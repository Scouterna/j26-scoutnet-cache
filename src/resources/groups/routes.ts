import { type } from 'arktype';
import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { resolver } from 'hono-openapi/arktype';
import { getGroups, refreshCache } from './groups.ts';

const app = new Hono();

const GetGroupsResponse = type({
	lastFetchedAt: 'string',
	nextFetchAt: 'string',
	groups: type({
		id: 'string',
		name: 'string | null',
		types: 'string[]',
		belongsToGroup: 'string | null',
		troops: type({
			id: 'string',
			name: 'string',
			type: 'string',
		}).array(),
	}).array(),
});

app
	.get(
		'/',
		describeRoute({
			description:
				'Get all groups from cache. If the cache is empty, it will fetch the groups from the Scoutnet API.',
			responses: {
				200: {
					description: 'List of groups',
					content: {
						'application/json': { schema: resolver(GetGroupsResponse) },
					},
				},
			},
			validateResponse: {
				status: 500,
				message:
					'Response validation failed. Please contact the service owner.',
			},
		}),
		async (c) => {
			return c.json(await getGroups());
		},
	)
	.post(
		'/refresh',
		describeRoute({
			description:
				'Force refresh the groups cache by fetching from the Scoutnet API.',
			responses: {
				204: {
					description: 'Groups cache refreshed successfully',
				},
			},
		}),
		async (c) => {
			await refreshCache();
			return c.body(null, 204);
		},
	);

export default app;
