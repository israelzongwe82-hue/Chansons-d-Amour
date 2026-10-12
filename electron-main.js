"use strict";

const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");

let mainWindow = null;
let isQuitting = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 360,
    minHeight: 600,
    title: "Chansons d’Amour",
    backgroundColor: "#fff0f5",
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.on("close", (event) => {
    if (isQuitting) {
      return;
    }

    event.preventDefault();

    dialog.showMessageBox(mainWindow, {
      type: "question",
      buttons: ["Rester dans l’application", "Quitter"],
      defaultId: 0,
      cancelId: 0,
      title: "Chansons d’Amour",
      message: "Voulez-vous vraiment quitter l’application ?"
    }).then((result) => {
      if (result.response === 1) {
        isQuitting = true;
        app.quit();
      }
    }).catch((error) => {
      console.error("Erreur de confirmation :", error);
    });
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("before-quit", () => {
  isQuitting = true;
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});