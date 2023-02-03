const electron = window.require("electron");
const { ipcRenderer } = electron;

export default function dataCrud(message) {
  return new Promise((resolve) => {
    ipcRenderer.once("data-crud", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("data-crud", message);
  });
}
