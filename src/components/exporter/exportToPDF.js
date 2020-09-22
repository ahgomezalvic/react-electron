import isElectron from 'is-electron';

export function InitExportView () {
    if (isElectron()) {
        window.ipcRenderer.on('wrote-pdf', (event, path) => {
            const message = `Wrote pdf to : ${path}`;
            document.getElementById('pdf-path').innerHTML = message;
        });   
    }
}