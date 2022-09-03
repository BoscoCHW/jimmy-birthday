import React from "react";
import { CountdownTimer } from "./components/CountdownTimer";
import { appWrapperStyle } from "./styles/AppStyles";
import { MessageForm } from "./components/MessageForm";

const App: React.FC = () => {
  return (
    <div className={appWrapperStyle}>
      <CountdownTimer targetDate="12 Oct 2022" />
      <MessageForm />
    </div>
  );
};

export default App;
