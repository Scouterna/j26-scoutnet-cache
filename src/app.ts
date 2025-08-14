import './arktypeConfig.ts';

import { Scalar } from '@scalar/hono-api-reference';
import { Hono } from 'hono';
import { openAPISpecs } from 'hono-openapi';
import groups from './resources/groups/routes.ts';

// Import config to ensure environment variables are set
import './config.ts';

const app = new Hono();

app
	.get('/', (c) => c.redirect('/docs'))
	.get(
		'/docs',
		Scalar({
			theme: 'saturn',
			url: '/openapi',
		}),
	)
	.get(
		'/openapi',
		openAPISpecs(app, {
			documentation: {
				info: {
					title: 'Hono',
					version: '1.0.0',
					description: 'API for greeting users',
				},
				servers: [
					{
						url: 'http://localhost:3000',
						description: 'Local server',
					},
				],
			},
		}),
	);

const routes = app.route('/groups', groups);

export default app;
export type AppType = typeof routes;
