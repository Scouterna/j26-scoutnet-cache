import { createClient } from '@scouterna/scoutnet';
import config from './config.ts';

export const scoutnet = createClient({
	baseUrl: config.SCOUTNET_API_URL,
});
