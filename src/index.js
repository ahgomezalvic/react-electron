import React, { useRef } from "react";
import ReactDOM from "react-dom";
import './index.css';
import './App.css';
import isElectron from 'is-electron';
import * as PDFManger from './modules/exportToPDF';
import * as socketManger from './modules/socketManager';

class ComponentToConvert extends React.Component {
  render() {
    return (
      <header className="App-header">
        <p>
          Hello World Alvic !!!
        </p>
      </header>
    );
  }
}

const ExportDocument = () => {
  PDFManger.InitExportView();
  socketManger.InitMsgReceived();
  const componentRef = useRef();
  const handlePrint = () => {
    if (isElectron()) {
      window.ipcRenderer.send('print-to-pdf');   
    }
  };
  const handleMsgServer = () => {
    if (isElectron()) {
      window.ipcRenderer.send('send-msg-socket', 'IDMSG_SCP_ESTAT');   
    }
  };
  return (
    <div className="App"> 
      <ComponentToConvert ref={componentRef} />  
      <p id='pdf-path'></p>    
      <p id='msg-path'></p>  
      <button id="print-pdf" onClick={handlePrint}>Convert Current BrowserWindow to PDF</button>
      <button id="send-msg" onClick={handleMsgServer}>Send mesage to Alvic Server</button>
    </div>
  );
};

ReactDOM.render(<ExportDocument />, document.querySelector("#root"));