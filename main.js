const {app,BrowserWindow} = require('electron');
var path = require('path');
let mainWindow = null;

app.on('ready', () =>{
    mainWindow = new BrowserWindow({frame: false,width: 950, height: 650, icon: path.join(__dirname, '/icon.png')});
    mainWindow.setMenu(null);
    mainWindow.loadURL('file://' + __dirname + '/index.html');
});