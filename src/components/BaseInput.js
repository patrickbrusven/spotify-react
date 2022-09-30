import { useState } from "react";
const BaseInput = (props) => {
  const { placeholder = 'example placeholder', type = 'text', inputChanged, inputValue} = props;
  // const [ inputValue, setInputValue] = useState(initialValue);
  const handleInput = (e) => {
    inputChanged(e.target.value)
  }
  return (
    <label>
      { placeholder }
      <input type={type} value={inputValue} onChange={handleInput} />
    </label>
  );
}

export default BaseInput;