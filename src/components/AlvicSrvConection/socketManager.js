import isElectron from 'is-electron';

export function InitMsgReceived () {
    if (isElectron()) {
        window.ipcRenderer.on('msg-received', (event, data) => {
            const message = `Server msg received : ${data}`;
            document.getElementById('msg-path').innerHTML = message;
        });   
    }
}