import React, { useState } from "react";

export default function Login() {
  const [text, setText] = useState();
   
  const [updated, setUpdated] = useState();

  const textOnChange = (e) => {
    setText(e.target.value);
  };

   const buttonOnClick = () => {
    setUpdated(text);
  }
  



  return (
    <div>
      <input type="text" value={text} onChange={textOnChange} />
      <button onClick={buttonOnClick}>Login</button>
      <p>Texto : {text}</p>
      <p>Texto Actualizado: {updated}</p>
    </div>
  );
}
