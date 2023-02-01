const path = require("path");

const { app, BrowserWindow, ipcMain } = require("electron");
// const isDev = require("electron-is-dev");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    // isDev
    //   ? "http://localhost:3000"
    //   :
    `file://${path.join(__dirname, "../build/index.html")}`
  );
  // Open the DevTools.
  // if (isDev) {
  //   win.webContents.openDevTools({ mode: "right" });
  // }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
const sqlite3 = require("sqlite3");

const database = new sqlite3.Database("./public/db.sqlite3", (err) => {
  if (err) console.error("Database opening error: ", err);
});

ipcMain.on("get-data", (event, arg) => {
  const sql = arg;
  database.all(sql, (err, rows) => {
    event.reply("get-data", (err && err.message) || rows);
  });
});
ipcMain.on("insert-data", (event, arg) => {
  const sql = arg;
  database.all(sql, (err, rows) => {
    event.reply("insert-data", (err && err.message) || "added");
    console.log(rows);
  });
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
