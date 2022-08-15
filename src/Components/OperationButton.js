import React from "react";
import { action } from "../App";

function OperationButton({dispatch,operation}) {
  return (
    <button
      onClick={() => dispatch({ type: action.operation, payload: { operation } })}
    >
      {operation}
    </button>
  );
}

export default OperationButton;
