import React, { useState } from "react";
import CustomInput from "./components/CustomInput";
import "./App.scss";
import { countries } from "../src/components/static/data";

function App() {
  const [value, setValue] = useState("");

  //********************************************

  const onHandleChange = val => {
    setValue(val);
  };

  //********************************************

  return (
    <div className="main">
      <CustomInput
        datasource={countries}
        onChangeInput={onHandleChange}
        value={value}
      />
    </div>
  );
}

export default App;
