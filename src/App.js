import { useReducer } from "react";
import "./App.css";
import DigitButton from "./Components/DigitButton";
import OperationButton from "./Components/OperationButton";

export const action = {
  addDigit: "addDigit",
  operation: "operation",
  clear: "clear",
  delete: "delete",
  calculate: "calculate",
};
const calculate = ({ firstOperand, secondOperand, operation }) => {
  const first = parseFloat(firstOperand);
  const second = parseFloat(secondOperand);
  if (isNaN(first) || isNaN(second)) return "";
  let result = "";
  switch (operation) {
    case "+":
      result = first + second;
      break;
    case "-":
      result = first - second;
      break;
    case "*":
      result = first * second;
      break;
    case "÷":
      result = first / second;
      break;
    default:
      throw new Error();
  }
  return result.toString();
};
const calculator = (state, { type, payload }) => {
  switch (type) {
    case action.addDigit:
      if (state.answer) {
        return {
          ...state,
          firstOperand: null,
          secondOperand: payload.digit,
          answer: false,
        };
      }
      if (payload.digit === "0" && state.secondOperand === "0") return state;
      if (payload.digit === "." && state.secondOperand === undefined)
        return state;
      if (payload.digit === "." && state.secondOperand.includes("."))
        return state;
      return {
        ...state,
        secondOperand: `${state.secondOperand || ""}${payload.digit}`,
      };
    case action.operation:
      if (state.firstOperand == null && state.secondOperand == null)
        return state;
      if (state.firstOperand == null) {
        return {
          ...state,
          firstOperand: state.secondOperand,
          operation: payload.operation,
          secondOperand: null,
        };
      }
      if (state.secondOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      return {
        ...state,
        firstOperand: calculate(state),
        operation: payload.operation,
        secondOperand: null,
      };
    case action.clear:
      return {};
    case action.calculate:
      return {
        ...state,
        firstOperand: calculate(state),
        secondOperand: null,
        operation: null,
        answer: true,
      };
    case action.delete:
      if (state.answer) {
        return {
          ...state,
          answer: true,
          secondOperand: null,
        };
      }
      if (state.secondOperand == null) return state;
      if (state.secondOperand.length === 1) {
        return {
          ...state,
          secondOperand: null,
        };
      }
      return {
        ...state,
        firstOperand: state.firstOperand,
        operation: state.operation,
        secondOperand: state.secondOperand.slice(0, -1),
      };
    default:
      throw new Error();
  }
};
function App() {
  const [{ firstOperand, secondOperand, operation }, dispatch] = useReducer(
    calculator,
    {}
  );
  return (
      <div className="calculator-grid">
        <div className="output">
          <div className="prev-output">
            {firstOperand}
            {operation}
          </div>
          <div className="current-output">{secondOperand}</div>
        </div>
        <button
          className="span-two"
          onClick={() => dispatch({ type: action.clear })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: action.delete })}>DEL</button>
        <OperationButton operation="÷" dispatch={dispatch}></OperationButton>
        <DigitButton digit={1} dispatch={dispatch} />
        <DigitButton digit={2} dispatch={dispatch} />
        <DigitButton digit={3} dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <DigitButton digit={4} dispatch={dispatch} />
        <DigitButton digit={5} dispatch={dispatch} />
        <DigitButton digit={6} dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit={7} dispatch={dispatch} />
        <DigitButton digit={8} dispatch={dispatch} />
        <DigitButton digit={9} dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit={0} dispatch={dispatch} />
        <button
          className="span-two"
          onClick={() => dispatch({ type: action.calculate })}
        >
          =
        </button>
      </div>
  );
}

export default App;
