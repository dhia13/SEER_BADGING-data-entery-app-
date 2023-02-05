const path = require("path");
const { app, BrowserWindow, ipcMain, dialog, Menu } = require("electron");

const isDev = require("electron-is-dev");
const sqlite3 = require("sqlite3").verbose();
const Excel = require("exceljs");
function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 1000,
    icon: __dirname + "../build/logo.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
}

const template = Menu.buildFromTemplate([
  {
    label: "Edit",
    submenu: [
      {
        label: "Undo",
        accelerator: "CmdOrCtrl+Z",
        role: "undo",
      },
      {
        label: "Redo",
        accelerator: "CmdOrCtrl+Shift+Z",
        role: "redo",
      },
      {
        label: "Cut",
        accelerator: "CmdOrCtrl+X",
        role: "cut",
      },
    ],
  },
  {
    label: "View",
    submenu: [
      {
        label: "Reload",
        accelerator: "CmdOrCtrl+R",
        role: "reload",
      },
      {
        type: "separator",
      },
      {
        label: "Zoom In",
        accelerator: "CmdOrCtrl+=",
        role: "zoomin",
      },
      {
        label: "Zoom Out",
        accelerator: "CmdOrCtrl+-",
        role: "zoomout",
      },
      {
        label: "Reset Zoom",
        accelerator: "CmdOrCtrl+0",
        role: "resetzoom",
      },
    ],
  },
  {
    label: "Window",
    submenu: [
      {
        label: "Minimize",
        accelerator: "CmdOrCtrl+M",
        role: "minimize",
      },
      {
        label: "Close",
        accelerator: "CmdOrCtrl+W",
        role: "close",
      },
    ],
  },
]);
if (!isDev) {
  Menu.setApplicationMenu(template);
}
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
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
ipcMain.on("exel", (event, arg) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("My Worksheet");

  // Add data to the worksheet
  worksheet.addRow([
    "id",
    "nom",
    "prenom",
    "email",
    "numero",
    "fonction",
    "etablisement",
    "pay",
    "adress",
  ]);
  worksheet.columns = [
    { header: "id", key: "id", width: 10 },
    { header: "nom", key: "nom", width: 20 },
    { header: "prenom", key: "prenom", width: 20 },
    { header: "email", key: "email", width: 40 },
    { header: "numero", key: "numero", width: 30 },
    { header: "fonction", key: "fonction", width: 20 },
    { header: "etablisement", key: "etablisement", width: 20 },
    { header: "pay", key: "pay", width: 20 },
    { header: "adress", key: "adress", width: 20 },
  ];
  // Add the data to the worksheet
  arg.forEach((rowData) => {
    worksheet.addRow(rowData);
  });
  const defaultPath = `${app.getPath("userData")}/output.xlsx`;
  dialog
    .showSaveDialog({
      title: "Save file",
      defaultPath: defaultPath,
    })
    .then((filePath_obj) => {
      if (filePath_obj.canceled) console.log("canceled");
      else
        workbook.xlsx
          .writeFile(filePath_obj.filePath)
          .then(() => {
            console.log(
              "The file was successfully exported to " + filePath_obj.filePath
            );
          })
          .catch((error) => {
            console.error(error);
          });
    });
});
ipcMain.on("data-crud", (event, arg) => {
  const sql = arg;
  database.all(sql, (err, rows) => {
    event.reply("data-crud", (err && err.message) || rows ? rows : "success");
  });
});
ipcMain.on("editDelete", (event, arg) => {
  const sql = arg;
  database.all(sql, (err, rows) => {
    event.reply("editDelete", (err && err.message) || rows ? rows : "success");
  });
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
