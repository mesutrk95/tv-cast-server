
const os = require('os');
const path = require('path');
const fs = require('fs');
const { ipcMain } = require('electron')

// let ipcRenderer = null;

const APP_DATA_PATH = path.join(process.env.HOME, 'AppData/tv-cast/')

class TVCastApp {

    start(win){ 
        this.win = win;

        if(!fs.existsSync(APP_DATA_PATH)){
            fs.mkdirSync(APP_DATA_PATH , { recursive : true });
        } 
        this.listenToApp();
    }

    listenToApp(){
        ipcMain.on('ready', (event, title) => { 
        })
                
        ipcMain.on('get-interfaces', (event, title) => {

            var networkInterfaces = os.networkInterfaces(); 
            console.log('networkInterfaces', networkInterfaces );  
            
            // this.win.webContents.send('network-interfaces', networkInterfaces); 
            event.reply('network-interfaces', networkInterfaces)
        })
    }


}

module.exports = TVCastApp;