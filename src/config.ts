import { type } from 'arktype';

const Config = type({
	'+': 'delete',
	SCOUTNET_API_URL: 'string.url',
	SCOUTNET_PROJECT_ID: 'string.integer',
	SCOUTNET_GROUPS_API_KEY: 'string>0',
});
type Config = typeof Config.infer;

const config = Config(process.env);

if (config instanceof type.errors) {
	throw new Error(`Configuration validation failed:\n${config.summary}`);
}

export default config as Config;
export type { Config };
