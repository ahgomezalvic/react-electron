import React, { useRef } from "react";
import { render } from "react-dom";
import isElectron from 'is-electron';
import * as PDFManger from './exportToPDF';

class ComponentToExport extends React.Component {
    render() {
      return (
        <p>Document to Export PDF File !!!</p>   
      );
    }
  }

const ExportDocument = () => {
  PDFManger.InitExportView();
  const componentRef = useRef();
  const handlePrint = () => {
    if (isElectron()) {
      window.ipcRenderer.send('print-to-pdf');   
    }
  };
  return (
    <div className="App">
      <div className="App-header">
        <ComponentToExport ref={componentRef} />  
        <p id='pdf-path'></p> 
        <button id="print-pdf" className="btn btn-primary" onClick={handlePrint}>Export to PDF</button>
      </div>
    </div>
  );
};

render(<ExportDocument />, document.querySelector("#root"));

export default ExportDocument;