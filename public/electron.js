const electron= require('electron');
const isDev = require("electron-is-dev");

const app = electron.app

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path');
const url = require('url');

// import the following to deal with pdf
const fs = require('fs');
const os = require('os');
const ipc = electron.ipcMain;
const shell = electron.shell;


const net = require('net');
const host = (process.argv[2] || '192.168.0.13');
const port = (process.argv[2] || '50000');

const socket = new net.Socket()

socket.connect(port, host);

socket.on('data', (data) => {
  console.log('Mensaje recibido desde servidor');
  console.log(data);
  // event.sender.send('msg-received', data);
});

socket.on('error', (e) => {
  console.log('Error de conexion socket TCP');
  console.log(e);
  socket.destroy();
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ 
        width: 1280, 
        height: 720,  
        webPreferences: { 
            nodeIntegration: true,
            preload: __dirname + '/preload.js'
        } 
     });

    mainWindow.loadURL(
      isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
    );

    mainWindow.on("closed", () => (mainWindow = null));

   // Open the DevTools. 
    mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

// Quit when all windows are closed. 
app.on('window-all-closed', () => { 
    // On macOS it is common for applications and their menu bar 
    // to stay active until the user quits explicitly with Cmd + Q 
    if (process.platform !== 'darwin') { 
      app.quit();
    } 
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }    
});

//Create PDF
ipc.on('print-to-pdf', event => {
    const pdfPath = path.join(os.tmpdir(), 'some-ducking-pdf.pdf');
    const win = BrowserWindow.fromWebContents(event.sender);
    var options = { 
      marginsType: 0, 
      pageSize: 'A4', 
      printBackground: true, 
      printSelectionOnly: false, 
      landscape: false
    };
    win.webContents.printToPDF(options).then(data => {
      fs.writeFile(pdfPath, data, err => {
        if (err) return console.log(err.message);
        shell.openExternal('file://' + pdfPath);
        event.sender.send('wrote-pdf', pdfPath);
      });      
    });
  });


  ipc.on('send-msg-socket', (event, data) => {
    console.log('Enviando mensaje a Alvic Server');
    console.log(data);
    socket.write(data);
  });