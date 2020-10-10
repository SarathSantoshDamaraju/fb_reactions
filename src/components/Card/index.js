import React from "react";

import "./index.scss";
import Summary from "../Summary";

/**
 * Card component to display the post information
 * @param {A dummy card} param0
 */
const Card = ({ reactionsData, usersList }) => {
  const { reactions, userContentReactions } = reactionsData;

  return (
    <div className="card">
      <img src="https://images.unsplash.com/photo-1602288478445-c1d71840f6b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Avatar" />
      <div className="container">
        <h4>
          <b>Revind and replay</b>
        </h4>
        <p>#retro and Films</p>
      </div>

      {/* Render summary only if the data is loaded else show loader */}
      {!!Object.keys(userContentReactions).length && !!Object.keys(reactions).length && (
        <Summary reactions={reactions} userReactions={userContentReactions} usersList={usersList} />
      )}
    </div>
  );
};

export default Card;
