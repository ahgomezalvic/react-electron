import isElectron from 'is-electron';

export function InitExportView () {
    if (isElectron()) {
        console.log('Call InitExportView');
        window.ipcRenderer.on('wrote-pdf', (event, path) => {
            const message = `Wrote pdf to : ${path}`;
            document.getElementById('pdf-path').innerHTML = message;
        });   
    }
}