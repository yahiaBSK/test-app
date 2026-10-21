import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.offlinetest",
  appName: "OfflineTestApp",
  webDir: "out",
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Show for 2 seconds
      launchAutoHide: true,
      backgroundColor: "#0044ff", // Matches your dark Tailwind slate-950 background
      showSpinner: true, // Clean look with no loading spinner
      androidSplashResourceName: "splash", // src/android/app/src/main/res/drawable/splash.xml
      androidScaleType: "CENTER_CROP",
      Animation: "FADE_IN",
    },
  },
};

export default config;
