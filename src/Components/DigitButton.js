import React from "react";
import { action } from "../App";

function DigitButton({ digit, dispatch }) {
  return <button digit={digit} onClick={()=>dispatch({type:action.addDigit,payload:{digit}})}>{digit}</button>;
}

export default DigitButton;
