import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ivanleonc.budget',
  appName: 'budget',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
