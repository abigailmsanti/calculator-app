import './App.css';
import { useState } from 'react';
import { evaluate, ResultSetDependencies } from 'mathjs';

export default function App() {
  const [calc, setCalc] = useState(null);
  // scope issue, where do i put these
  function Square({ value }) {
    return (
      <button className="square" onClick={() => handleClick(value)}>
        {value}
      </button>
    );
  }

  function Operators({ value }) {
    return (
      <button className="operator" onClick={() => handleClick(value)}>
        {value}
      </button>
    );
  }

  function clearCalc() {
    setCalc(null);
    const displayDiv = document.getElementById('display');
    displayDiv.innerHTML = 'Cleared';
    setTimeout(function () {
      displayDiv.innerHTML = 'Start Mathin Again';
    }, 1000);
  }
  function doCalc() {
    let result = evaluate(calc);
    setCalc(result.toString());
    const displayDiv = document.getElementById('display');
    displayDiv.innerHTML = result;
  }

  function handleClick(value) {
    let newCalc;
    if (value == 'AC') {
      clearCalc();
      return;
    }
    if (value == '=') {
      doCalc();
      return;
    }
    if (calc) {
      newCalc = calc.slice();
      newCalc = newCalc + value;
      setCalc(newCalc);
    } else {
      setCalc(value);
      newCalc = value;
    }
    const displayDiv = document.getElementById('display');
    displayDiv.innerHTML = newCalc;
  }
  return (
    <div className="App">
      <div>
        <h1>
          <strong>Calculator</strong>
        </h1>
      </div>
      <div id="display" className="display">
        Start Mathin!
      </div>
      <div className="calculator">
        <>
          <div className="calc-row">
            <Square value="1" />
            <Square value="2" />
            <Square value="3" />
            <Operators value="/" />
          </div>
          <div className="calc-row">
            <Square value="4" />
            <Square value="5" />
            <Square value="6" />
            <Operators value="*" />
          </div>
          <div className="calc-row">
            <Square value="7" />
            <Square value="8" />
            <Square value="9" />
            <Operators value="-" />
          </div>
          <div className="calc-row">
            <Square value="." />
            <Square value="0" />
            <Operators value="+" />
          </div>
          <div>
            <Operators value="=" />
            <Operators value="AC" />
          </div>
        </>
      </div>
      <div className="op-row"></div>
    </div>
  );
}
