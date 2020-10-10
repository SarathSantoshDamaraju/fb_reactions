import React, { useState } from "react";

import Tooltip from "../Tooltip/index";
import Modal from "../Modal";
import Tabs from "../Tabs";
import Avatar from '../Avatar';
import "./index.scss";

/**
 * @method getIndividualReactedCount
 * @description for every reaction get the total impressions from the user impressions (user content impressions)
 * @param {Array} allImpressions
 * @param {Ar} reactions
 */
const getIndividualReactedCount = (allImpressions = [], reactions = [], usersList = []) => {
  var _reactions = [].concat(reactions);

  if (_reactions) {
    _reactions.forEach((reaction) => {
      reaction.impressions = [];

      allImpressions.forEach((impression) => {
        if (reaction["id"] === impression["reaction_id"]) {
          reaction.impressions.push(
            ...usersList.filter((user) => user["id"] === impression["user_id"])
          );
        }
      });
    });
  }

  return _reactions;
};

/**
 * @method getTopNReactions
 * @description Return the Highest N reactions. If no count is provided the all the top reactions are returned
 * This doesnt return any duplicate data for any reaction
 * @param {Array} reactions
 * @param {Number} count
 */
const getTopNReactions = (reactions = [], count = reactions.length || 0) => {
  if (reactions.length) {
    return reactions.sort((a, b) => b.impressions - a.impressions).slice(0, count);
  }
};

/**
 *
 */
const ReactionTabs = ({ data }) => {
  return (
    <Tabs>
      {data.map((each) => {
        return (
          <div name={each.name} label={each.emoji} key={each.id}>
            {each.impressions.map((impression) => (
              <div key={impression.id}> <Avatar data={impression}/></div>
            ))}
          </div>
        );
      })}
    </Tabs>
  );
};

/**
 * Summary Component to show
 * - Top reactions summary #1
 * - Individual reaction summary on hover #2
 * - Total reaction Summary on Click #3
 * @param {*} param0
 */
function Summary({ userReactions, reactions, usersList }) {
  let [focusedReaction, setFocusedReaction] = useState(""),
    [showReactionsModal, toggleModal] = useState(false),
    IndividualReactions = getIndividualReactedCount(userReactions, reactions, usersList) || [];

  // function handler for Modal close and On focus
  let onClose = () => {
      toggleModal(false);
    },
    onHover = async (reaction) => {
      setFocusedReaction({
        emoji: reaction.emoji,
        name: reaction.name,
        list: IndividualReactions.filter((each) => each.id === reaction.id),
      });
    };

  return (
    <div className="summary">
      <ul className="summary__reactions">
        {IndividualReactions.length &&
          getTopNReactions(IndividualReactions, 3).map((reaction) => (
            <li
              key={reaction.id}
              onClick={() => toggleModal(true)} // click to show modal #3
              onMouseEnter={() => onHover(reaction)} // for hover summary #2
              onMouseLeave={() => setFocusedReaction("")}
            >
              {reaction.emoji}
            </li>
          ))}
      </ul>
      <p className="summary__text">{userReactions.length}</p>

      {/* #2 Tooltip */}
      {focusedReaction && (
        <Tooltip heading={focusedReaction.name}>
          <ul>
            {focusedReaction.list &&
              focusedReaction.list[0].impressions.map((eachImpression) => (
                <li key={eachImpression.id}>{eachImpression.first_name}</li>
              ))}
          </ul>
        </Tooltip>
      )}

      {/* #3 Modal */}
      {showReactionsModal && (
        <Modal show={showReactionsModal} handleClose={onClose}>
          <ReactionTabs data={IndividualReactions} />
        </Modal>
      )}
    </div>
  );
}

export default Summary;
