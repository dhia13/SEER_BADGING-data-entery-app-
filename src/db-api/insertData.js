const electron = window.require("electron");
const { ipcRenderer } = electron;

export default function insertData(message) {
  return new Promise((resolve) => {
    ipcRenderer.once("insert-data", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("insert-data", message);
  });
}
