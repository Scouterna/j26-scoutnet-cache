import { serve } from '@hono/node-server';
import app from './app.ts';

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;

serve(
	{
		fetch: app.fetch,
		port,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
