import React, { useState } from 'react';
import axios from 'axios';

const TelegramBot = () => {
  const [botToken, setBotToken] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBotTokenChange = (event) => {
    setBotToken(event.target.value);
  };

  const handleCheckToken = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`https://api.telegram.org/bot${botToken}/getMe`);
      setResult(response.data);
    } catch (error) {
      setResult({ error: error.response.data });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <h1 className="title">Telegram Bot Token Checker</h1>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label">Bot Token</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter your Telegram Bot Token"
                value={botToken}
                onChange={handleBotTokenChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                className={`button is-primary ${isLoading ? 'is-loading' : ''}`}
                onClick={handleCheckToken}
              >
                Check Token
              </button>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="content">
            {result && (
              <div>
                <h2 className="subtitle">Result</h2>
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelegramBot;
