import React, { useEffect } from "react";
import MainPage from "./pages/MainPage";

import { runSocket, runEmitter } from "./utils/websockets";
import { generateUniqueId } from "./utils/helpers";

const App: React.FC = () => {
  // useEffect(() => {
  //   runSocket();
  //   let uniqueId;
  //   if (!localStorage.getItem("uniqueId")) {
  //     uniqueId = generateUniqueId();
  //     console.log(uniqueId);
  //     localStorage.setItem("uniqueId", uniqueId);
  //   } else {
  //     uniqueId = localStorage.getItem("uniqueId");
  //   }
  //   runEmitter("set unique id", { uniqueId });
  // }, []);
  return <MainPage></MainPage>;
};

export default App;
