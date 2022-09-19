import React, { useState } from "react";
import {
  inputWrapperStyle,
  messageFormStyle,
  messageFormWrapperStyle,
  messageFormHeadingStyle,
  buttonStyle,
  inputStyle,
} from "../styles/MessageFormStyles";

export const MessageForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const resetInputs = () => {
    setTitle("");
    setMessage("");
    setPassphrase("");
  };
  return (
    <div className={messageFormWrapperStyle}>
      <p className={messageFormHeadingStyle}>
        Send a notification to subscribers!
      </p>
      <form className={messageFormStyle}>
        <div className={inputWrapperStyle}>
          <label htmlFor="title">Title:</label>
          <input
            className={inputStyle}
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={inputWrapperStyle}>
          <label htmlFor="message">Message:</label>
          <textarea
            className={inputStyle}
            name="message"
            id="message"
            cols={35}
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className={inputWrapperStyle}>
          <label htmlFor="passphrase">Passphrase:</label>
          <input
            className={inputStyle}
            type="text"
            name="passphrase"
            id="passphrase"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
          />
        </div>
        <input
          className={buttonStyle}
          type="button"
          value="Send"
          onClick={() => {
            if (passphrase === "helloBosco") {
              fetch("/api/send-msg/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  title,
                  body: message,
                  url: "https://jimmy-birthday.herokuapp.com/",
                }),
              });
            }
            resetInputs();
          }}
        />
      </form>
    </div>
  );
};
