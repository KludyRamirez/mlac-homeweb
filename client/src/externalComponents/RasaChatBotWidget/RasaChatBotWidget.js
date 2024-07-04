import React, { useEffect } from "react";

const RasaChatBotWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@rasahq/rasa-chat";
    script.async = true;

    // Append the script to the document body
    document.body.appendChild(script);

    // Cleanup: remove the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      id="rasa-chat-widget"
      data-websocket-url="http://localhost:5005/"
      data-height={475}
    ></div>
  );
};

export default RasaChatBotWidget;
