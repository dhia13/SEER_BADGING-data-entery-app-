const electron = window.require("electron");
const { ipcRenderer } = electron;

export function dataCrud(message) {
  return new Promise((resolve) => {
    ipcRenderer.once("data-crud", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("data-crud", message);
  });
}
export function editDelete(message) {
  return new Promise((resolve) => {
    ipcRenderer.once("editDelete", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("editDelete", message);
  });
}
export function sendExcel(sql) {
  return new Promise((resolve) => {
    ipcRenderer.once("exel", (_, settingsResult) => {
      resolve(settingsResult);
    });
    ipcRenderer.send("exel", sql);
  });
}
export function getSettings(sql) {
  return new Promise((resolve) => {
    ipcRenderer.once("settings", (_, settingsResult) => {
      resolve(settingsResult);
    });
    ipcRenderer.send("settings", sql);
  });
}
