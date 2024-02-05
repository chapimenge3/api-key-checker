import { useState } from "react";
import axios from "axios";

const TwilioTokenChecker = () => {
  const [accountSid, setAccountSid] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}.json`,
        {
          auth: {
            username: accountSid,
            password: authToken,
          },
        }
      );
      setIsLoading(false);
      setResult(response.data);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <h1 className="title">Twilio API key checker</h1>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label">Account SID</label>
            <div className="control">
              <input
                type="text"
                id="accountSid"
                className="input"
                value={accountSid}
                onChange={(e) => setAccountSid(e.target.value)}
                required
              />

            </div>
          </div>
          <div className="field">
            <label className="label">Auth Token</label>
            <div className="control">
              <input
                type="password"
                id="authToken"
                className="input"
                value={authToken}
                onChange={(e) => setAuthToken(e.target.value)}
                required
              />

            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                className={`button is-primary ${isLoading ? 'is-loading' : ''}`}
                onClick={handleSubmit}
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
                <h2 className="subtitle">Result (Valid Twilio API key)</h2>
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </div>
            )}
            {error && (
              <div className="notification is-danger">
                <button className="delete" onClick={() => setError(null)}></button>
                Invalid Account SID or Auth Token
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwilioTokenChecker;
