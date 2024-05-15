import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run enjoy-app:serve',
        production: 'nx run enjoy-app:preview',
      },
      ciWebServerCommand: 'nx run enjoy-app:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
