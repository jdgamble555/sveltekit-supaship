import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
	
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	projects: [
		{
			name: "Google Chrome",
			use: {
				channel: "chrome",
			},
		},

		// /* Test against mobile viewports. */
		{
			name: "Mobile Chrome",
			use: {
				...devices["Pixel 5"],
			},
		},
	]
};

export default config;
