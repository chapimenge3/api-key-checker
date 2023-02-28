import { useState } from "react";
import axios from "axios";

const TwilioTokenChecker = () => {
  const [accountSid, setAccountSid] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
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
      setIsSuccess(true);
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
          <h1 className="title">Twilio Key checker</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="accountSid" className="label">
            Account SID
          </label>
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
          <label htmlFor="authToken" className="label">
            Auth Token
          </label>
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
              type="submit"
              className={`button is-primary ${isLoading ? "is-loading" : ""}`}
              disabled={isLoading}
            >
              Check Token
            </button>
          </div>
        </div>
      </form>
      <br />
      <br />
      {error && (
        <div className="notification is-danger">
          <button className="delete" onClick={() => setError(null)}></button>
          Invalid Account SID or Auth Token"
        </div>
      )}
      {isSuccess && (
        <div>
          <div className="notification is-success">
            <button
              className="delete"
              onClick={() => setIsSuccess(false)}
            ></button>
            Token is valid!
            <h2 className="subtitle">Result</h2>
          </div>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TwilioTokenChecker;
