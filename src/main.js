const app = require('app');
const BrowserWindow = require('browser-window');

app.on('ready', function () {
  let mainWindow = new BrowserWindow({
    width: 1366,
    height: 768
  });

  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});
