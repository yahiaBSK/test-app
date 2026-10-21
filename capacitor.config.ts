import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.offlinetest",
  appName: "OfflineTestApp",
  webDir: "out",
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000, // Show for 2 seconds
      launchAutoHide: true,
      backgroundColor: "#030712", // Matches your dark Tailwind slate-950 background
      showSpinner: false, // Clean look with no loading spinner
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
    },
  },
};

export default config;
