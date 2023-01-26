const electron = window.require("electron");
const { ipcRenderer } = electron;

export default function getData(message) {
  return new Promise((resolve) => {
    ipcRenderer.once("get-data", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("get-data", message);
  });
}
