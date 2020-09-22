
import React, { useRef } from "react";
import { render } from "react-dom";
import { useReactToPrint } from 'react-to-print';

class ComponentToPrint extends React.Component {
  render() {
    return (
      <div>
        <div style={{ fontSize: "40px", color: "green" }}>
          test print 1.
        </div>
        <div style={{ color: "blue" }}>
          test print 2.
        </div>
      </div>
    );
  }
}

const PrintDocument = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <button onClick={handlePrint}>Print Document!</button>
    </div>
  );
};

render(<PrintDocument />, document.querySelector("#root"));

export default PrintDocument;


