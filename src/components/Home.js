import React from "react";
import Notes from "./Notes";
export default function Home(props) {
  const {showAlert,mode}=props
  return (
    <div>
        <Notes showAlert={showAlert} mode={mode}/>
      </div>
  );
}
