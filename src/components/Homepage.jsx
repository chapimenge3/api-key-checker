import React from "react";
import "bulma/css/bulma.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            <div className="column is-one-third">
              <div className="box">
                <Link to={"/telegram-bot-token"} className="title">
                  Telegram Bot
                </Link>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="box">
                <Link to={"/twilio-token"} className="title">
                  Twilio Token
                </Link>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="box">
                <Link to={"/google-map"} className="title">
                  Google Map
                </Link>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="box">
                <Link to={"#"} className="title">
                  Coming Soon ...
                </Link>
              </div>
            </div>
            {/* <div className="column is-one-third">
              <div className="box">
                <p className="title">Service Name 3</p>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="box">
                <p className="title">Service Name 4</p>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="box">
                <p className="title">Service Name 5</p>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="box">
                <p className="title">Service Name 6</p>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="box">
                <p className="title">Service Name 7</p>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="box">
                <p className="title">Service Name 8</p>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
