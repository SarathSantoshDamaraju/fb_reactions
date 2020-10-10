import React, { useState, useEffect } from "react";

import "./App.scss";
import Card from "./components/Card";
import { get } from "./api";

/**
 * @method App
 * @description Parent Component which has cards rendered.
 * DDAU: All the API calls for Card Data will happen here and data would flow down and actions will bubble up.
 */
function App() {
  const [reactions, setReactions] = useState([]),
    [usersList, setUsersList] = useState([]),
    [userContentReactions, setUserContentReactions] = useState([]);
  let reactionsData = {
    reactions,
    userContentReactions,
  };

  /**
   * Reactions and the Content reactions are loaded in the
   * blocking way as the data is dependent
   *
   * Fall back data is provided from the constants file
   */
  useEffect(() => {
    async function fetchData() {
      let reactions = await get({ endPoint: "reactions" }),
        userContentReactions = await get({
          endPoint: "user_content_reactions",
          params: 'content_id=1'
        }),
        usersList = await get({ endPoint: "users" });

      setUsersList(usersList);
      setReactions(reactions);
      setUserContentReactions(userContentReactions);
    }

    fetchData();
  }, []);

  return (
    <>
      <Card reactionsData={reactionsData} usersList={usersList} />
    </>
  );
}

export default App;
