const electron = window.require("electron");
const { ipcRenderer } = electron;

export default function sendExcel(sql) {
  return new Promise((resolve) => {
    ipcRenderer.once("exel", (_, settingsResult) => {
      resolve(settingsResult);
    });
    ipcRenderer.send("exel", sql);
  });
}
