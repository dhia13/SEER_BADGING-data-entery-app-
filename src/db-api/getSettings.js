const electron = window.require("electron");
const { ipcRenderer } = electron;

export default function getSettings(sql) {
  return new Promise((resolve) => {
    ipcRenderer.once("settings", (_, settingsResult) => {
      resolve(settingsResult);
    });
    ipcRenderer.send("settings", sql);
  });
}
