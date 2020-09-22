import React, { useRef } from 'react';
import { render } from "react-dom";
import isElectron from 'is-electron';
import * as socketManger from './socketManager';

class ComponentAlvicServer extends React.Component {
    render() {
      return (
        <p>Alvic Server Socket Client Conection !!!</p>             
      );
    }
};

const TCPSocketClient = () => {
  socketManger.InitMsgReceived();
  const componentRef = useRef();
  const handleMsgServer = () => {
    if (isElectron()) {
      window.ipcRenderer.send('send-msg-socket', 'IDMSG_SCP_ESTAT');   
    }
  };
  return (
    <div className="App"> 
      <div className="App-header" >
        <ComponentAlvicServer ref={componentRef} />    
        <div id='msg-path'></div>
        <button id="send-msg" className="btn btn-primary" onClick={handleMsgServer}>Send mesage to Alvic Server</button>
      </div>
    </div>
  );
};

render(<TCPSocketClient />, document.querySelector("#root"));

export default TCPSocketClient;