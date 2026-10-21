"use client";

import { useState, useEffect } from "react";
import { LocalNotifications } from "@capacitor/local-notifications";
import { StatusBar, Style } from "@capacitor/status-bar";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [savedData, setSavedData] = useState("No data stored yet.");
  const [status, setStatus] = useState("App is ready.");

  useEffect(() => {
    const initStatusBar = async () => {
      try {
        await StatusBar.setStyle({
          style: Style.Dark,
        });

        // Keep the WebView drawing behind the status bar.
        await StatusBar.setOverlaysWebView({
          overlay: true,
        });
      } catch (error) {
        console.warn("Unable to configure status bar:", error);
      }
    };

    void initStatusBar();
  }, []);

  // Load saved data on mount
  useEffect(() => {
    const cached = localStorage.getItem("offline_test_key");
    if (cached) setSavedData(cached);
  }, []);

  const handleSaveLocally = () => {
    localStorage.setItem("offline_test_key", inputText);
    setSavedData(inputText);
    setStatus("Data saved to local storage!");
  };

  const handleTriggerNotification = async () => {
    try {
      // 1. Request permission
      const perm = await LocalNotifications.requestPermissions();
      if (perm.display !== "granted") {
        setStatus("Notification permission denied!");
        return;
      }

      // 2. Schedule a notification to fire in 5 seconds (completely offline)
      await LocalNotifications.schedule({
        notifications: [
          {
            title: "⚡ Offline Alert",
            body: `Saved message: "${savedData}"`,
            id: 1,
            schedule: { at: new Date(Date.now() + 5000) },
            iconColor: "#0044ff",
            smallIcon: "res://drawable/splash",
          },
        ],
      });

      setStatus(
        "Notification scheduled for 5 seconds from now. Turn off Wi-Fi and wait!",
      );
    } catch (err) {
      setStatus(`Error: ${err}`);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
        <h1 className="text-2xl font-bold text-center text-cyan-400">
          Capacitor Offline Test
        </h1>

        <div className="space-y-2">
          <label className="text-sm text-slate-400">Test Input Data:</label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type something..."
            className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-500 text-white"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSaveLocally}
            className="flex-1 bg-cyan-600 hover:bg-cyan-500 py-3 rounded-xl font-semibold transition"
          >
            Save Locally
          </button>
          <button
            onClick={handleTriggerNotification}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 py-3 rounded-xl font-semibold transition"
          >
            Test Notification
          </button>
        </div>

        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Cached Storage State:
          </p>
          <p className="text-sm font-mono text-cyan-300">{savedData}</p>
        </div>

        <div className="text-center text-xs text-slate-500">
          Status: <span className="text-slate-300">{status}</span>
        </div>
      </div>
    </main>
  );
}
