import React from "react";

import { Routes, Route, Link } from "react-router-dom";

import Homepage from "./components/Homepage";
import TelegramBot from "./services/TelegramBot";
import TwilioTokenChecker from "./services/TwilioTokenChecker";
import Layout from "./Layout";
import GoogleMap from "./services/GoogleMap";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="telegram-bot-token" element={<TelegramBot />} />
          <Route path="twilio-token" element={<TwilioTokenChecker />} />
          <Route path="google-map" element={<GoogleMap />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
