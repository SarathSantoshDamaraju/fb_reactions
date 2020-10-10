import React from "react";
import ContentLoader from "react-content-loader";

import "./index.scss";
import Summary from "../Summary";

/**
 * DUMMY card just for UI purpose
 * Card component to display the post information
 * @param {A dummy card} param0
 */
const Card = ({ reactionsData, usersList }) => {
  const { reactions, userContentReactions } = reactionsData;

  return (
    <div className="card">
      {/* Render summary only if the data is loaded else show loader */}
      {!!Object.keys(userContentReactions).length && !!Object.keys(reactions).length && (
        <>
          <img
            src="https://images.unsplash.com/photo-1602288478445-c1d71840f6b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="Avatar"
          />
          <div className="container">
            <h4>
              <b>Revind and replay</b>
            </h4>
            <p>#retro and Films</p>
          </div>
          <Summary
            reactions={reactions}
            userReactions={userContentReactions}
            usersList={usersList}
          />
        </>
      )}

      {!Object.keys(userContentReactions).length && !Object.keys(reactions).length && (
        <>
          <ContentLoader
            speed={2}
            width={250}
            height={316}
            viewBox="0 0 250 316"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <circle cx="28" cy="259" r="15" />
            <rect x="32" y="203" rx="2" ry="2" width="140" height="10" />
            <rect x="2" y="2" rx="2" ry="2" width="250" height="180" />
            <circle cx="76" cy="259" r="15" />
          </ContentLoader>
        </>
      )}
    </div>
  );
};

export default Card;
