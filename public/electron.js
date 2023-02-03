const path = require("path");

const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1600,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // Open the DevTools.
  // if (isDev) {
  //   win.webContents.openDevTools({ mode: "right" });
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
const sqlite3 = require("sqlite3").verbose();
let database;
if (isDev) {
  database = new sqlite3.Database("./public/App.sqlite", (err) => {
    if (err) console.error("Database opening error: ", err);
  });
} else {
  database = new sqlite3.Database(
    app.getPath("userData") + "/App.sqlite",
    (err) => {
      if (err) console.error("Database opening error: ", err);
    }
  );
}
// create init db
database.serialize(() => {
  database
    .run(
      "CREATE TABLE IF NOT EXISTS Enteries (id INTEGER PRIMARY KEY,nom TEXT,prenom TEXT,email TEXT,numero INTEGER,fonction TEXT,etablisement TEXT,pay TEXT,adress TEXT)"
    )
    .run(
      "CREATE TABLE IF NOT EXISTS Settings (id INTEGER PRIMARY KEY,freetrial Text)"
    )
    .run("INSERT OR REPLACE INTO Settings (id, freetrial) VALUES('1','0')");
});
ipcMain.on("settings", (event, arg) => {
  database.all(arg, (err, res) => {
    event.reply("settings", (err && err.message) || res);
  });
});
ipcMain.on("data-crud", (event, arg) => {
  const sql = arg;
  database.all(sql, (err, rows) => {
    event.reply("data-crud", (err && err.message) || rows ? rows : "success");
  });
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
