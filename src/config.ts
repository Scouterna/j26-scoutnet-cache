import { type } from 'arktype';

const Config = type({
	'+': 'delete',
	'PORT?': type('string.integer>0').pipe((value) => Number.parseInt(value, 10)),
	SCOUTNET_API_URL: 'string.url',
	SCOUTNET_PROJECT_ID: 'string.integer',
	SCOUTNET_GROUPS_API_KEY: 'string>0',
});
type Config = typeof Config.infer;

function createProxyConfig() {
	return new Proxy({} as Config, {
		get(_, prop: string) {
			if (
				!process.env.SUPPRESS_CONFIG_WARNINGS ||
				process.env.SUPPRESS_CONFIG_WARNINGS === 'false'
			) {
				console.warn(`Accessing property ${prop} before config is loaded`);
			}
			return undefined;
		},
	});
}

const config = createProxyConfig();

export function loadConfig() {
	const config = Config(process.env);

	if (config instanceof type.errors) {
		throw new Error(`Configuration validation failed:\n${config.summary}`);
	}
}

export default config as Config;
export type { Config };
