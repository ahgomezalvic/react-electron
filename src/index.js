import React, { useRef } from "react";
import ReactDOM from "react-dom";
import './index.css';
import './App.css';
import isElectron from 'is-electron';
import * as PDFManger from './modules/exportToPDF'

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
  const componentRef = useRef();
  const handlePrint = () => {
    console.log('Call Button Export');
    if (isElectron()) {
      window.ipcRenderer.send('print-to-pdf');   
    }
  };
  return (
    <div className="App"> 
      <ComponentToConvert ref={componentRef} />  
      <p id='pdf-path'></p>    
      <button id="print-pdf" onClick={handlePrint}>Convert Current BrowserWindow to PDF</button>
    </div>
  );
};

ReactDOM.render(<ExportDocument />, document.querySelector("#root"));